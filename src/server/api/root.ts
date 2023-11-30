import { createTRPCRouter } from "~/server/api/trpc";
import { KeyResultRouter, objectiveRouter, okrTermRouter } from "./routers";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  okrTerm: okrTermRouter,
  objective: objectiveRouter,
  keyResult: KeyResultRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
