// convex/functions/authenticate.ts

import jwt from "jsonwebtoken";
import { internal, mutation } from "convex/server";

const { JWT_SECRET } = process.env;

export const authenticate = mutation(async ({ auth, db }, { token }) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await db.get(decoded.user_id);
    if (!user) throw new Error("User not found");
    return { user };
  } catch (error) {
    throw new Error("Invalid token");
  }
});

export default internal(authenticate);
