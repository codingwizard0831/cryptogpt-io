import { NextResponse } from "next/server";

import { signToken } from "src/lib/utils";
import { supabase, supabaseServiceRole } from "src/lib/supabase";

export async function POST(req: Request) {
  try {
    const res = await req.json();
    const { userId } = res;

    try {
      let finalAuthUser: any = null;
      // 2. Select * from public.auth_users view where email matches
      const { data: authUser, error: authUserError } = await supabase
        .from("auth_users")
        .select("*")
        .eq("email", `${userId}@cryptogpt.io`)
        .single();

      if (!authUser || authUserError) {
        const { data: newUser, error: newUserError } =
          await supabaseServiceRole.auth.admin.createUser({
            email: `${userId}@cryptogpt.io`,
            user_metadata: { binanceUserId: userId },
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
              lastLoggedinTime: new Date().toISOString(),
              lastAuthStatus: "success",
              lastLoggedinProvider: "binance"
            }
          },
        ])
        .eq("email", `${userId}@cryptogpt.io`)
        .select();

      const token = await signToken(
        {
          email: `${userId}@cryptogpt.io`,
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
