import { NextResponse } from "next/server";

import { signToken } from "src/lib/utils";
import { verifyMessageWithMetamask } from "src/lib/metamask";
import { supabase, supabaseServiceRole } from "src/lib/supabase";

export async function POST(req: Request) {
  try {
    const res = await req.json();
    const { address, signedMessage, message, nonce } = res;

    const rst = await verifyMessageWithMetamask(message, signedMessage);
    if (rst.status === "error" && rst.error) {
      return NextResponse.json({ error: rst.error }, { status: 401 });
    }

    try {
      // 2. Select * from public.user table to get nonce
      const { data: user, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("address", address)
        .single();

      if (user && !userError) {
        // 3. Verify the nonce included in the request matches what's already in public.users table for that address
        if (user?.auth.nonce !== nonce) {
          return NextResponse.json(
            { data: null, error: "Nonce verification failed" },
            { status: 401 }
          );
        }

        let finalAuthUser = null;
        // 2. Select * from public.auth_users view where address matches
        const { data: authUser, error: authUserError } = await supabase
          .from("auth_users")
          .select("*")
          .eq("raw_user_meta_data->>address", address)
          .single();

        if (!authUser || authUserError) {
          const { data: newUser, error: newUserError } =
            await supabaseServiceRole.auth.admin.createUser({
              email: `${address}@cryptogpt.io`,
              user_metadata: { address },
              email_confirm: true,
            });

          if (newUserError || !newUser) {
            return NextResponse.json(
              { data: null, error: "Failed to create auth user" },
              { status: 500 }
            );
          }

          // response object is different from auth.users view
          finalAuthUser = newUser.user;
        } else {
          // selection from auth.users view is the user, assign
          finalAuthUser = authUser;
        }

        // 5. Update public.users.id with auth.users.id
        await supabase
          .from("users")
          .update([
            {
              id: finalAuthUser?.id,
              auth: {
                nonce,
                lastAuth: new Date().toISOString(),
                lastAuthStatus: "success",
              },
            },
          ])
          .eq("address", address)
          .select();

        // 6. We sign the token and return it to client
        const token = await signToken(
          {
            address,
            sub: finalAuthUser.id,
            aud: "authenticated",
          },
          { expiresIn: `${10000000}s` }
        );
        const response = NextResponse.json(
          {
            data: {
              token,
              user: finalAuthUser,
            },
            error: null,
          },
          { status: 200 }
        );
        return response;
      }

      return NextResponse.json(
        { data: null, error: userError?.message || "Internal Server Error" },
        { status: 500 }
      );
    } catch (error: any) {
      return NextResponse.json(
        { data: null, error: error?.message || "Internal Server Error" },
        { status: 500 }
      );
    }
  } catch (error) {
    // console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
