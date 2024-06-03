import { ConvexClient } from "convex/browser";
import convexConfig from "../convex.json";

const convex = new ConvexClient(convexConfig.origin);

export default convex;