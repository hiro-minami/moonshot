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
  updateTask: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.task.update({
        where: { id: input.id },
        data: {
          name: input.name,
        },
      });
    }),
  setDueDate: publicProcedure
    .input(
      z.object({
        id: z.number(),
        dueDate: z.date(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.task.update({
        where: { id: input.id },
        data: {
          dueDate: input.dueDate,
        },
      });
    }),
  finishTask: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.task.update({
        where: { id: input.id },
        data: {
          isDone: true,
          endDate: new Date(),
        },
      });
    }),
  deleteTask: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.task.delete({ where: { id: input.id } });
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
