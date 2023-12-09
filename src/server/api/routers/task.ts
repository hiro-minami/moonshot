import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const TaskRouter = createTRPCRouter({
  createTask: publicProcedure
    .input(
      z.object({
        name: z.string(),
        keyResultId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.task.create({
        data: {
          name: input.name,
          keyResult: { connect: { id: input.keyResultId } },
          isDone: false,
          startDate: new Date(),
          endDate: null,
        },
      });
    }),
  getTasks: publicProcedure
    .input(
      z.object({
        keyResultId: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.task.findMany({
        where: { keyResultId: input.keyResultId },
        orderBy: { id: "asc" },
      });
    }),
});
