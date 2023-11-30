import { createTRPCRouter } from "~/server/api/trpc";
import { okrTermRouter } from "./routers/okr-term";
import { objectiveRouter } from "./routers/objective";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  okrTerm: okrTermRouter,
  objective: objectiveRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
