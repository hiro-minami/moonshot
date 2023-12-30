import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const objectiveRouter = createTRPCRouter({
  createObjective: publicProcedure
    .input(
      z.object({
        name: z.string(),
        createdById: z.string(),
        okrTermId: z.number(),
        description: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.objective.create({
        data: {
          name: input.name,
          createdBy: { connect: { id: input.createdById } },
          okrTerm: { connect: { id: input.okrTermId } },
          description: input.description,
        },
      });
    }),
  updateObjective: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
        description: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.objective.update({
        where: { id: input.id },
        data: {
          name: input.name,
          description: input.description,
        },
      });
    }),
  deleteObjective: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.keyResult.deleteMany({
        where: { objectiveId: input.id },
      });
      return ctx.db.objective.delete({ where: { id: input.id } });
    }),
  getObjective: publicProcedure
    .input(
      z.object({
        okrTerm: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.objective.findFirst({
        where: {
          okrTermId: input.okrTerm,
        },
      });
    }),
});
