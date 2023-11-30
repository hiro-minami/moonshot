import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const KeyResultRouter = createTRPCRouter({
  createKeyResult: publicProcedure
    .input(
      z.object({
        name: z.string(),
        okrTermId: z.number(),
        objectiveId: z.number(),
        createdById: z.string(),
        targetValue: z.number(),
        unit: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.keyResult.create({
        data: {
          name: input.name,
          okrTerm: { connect: { id: input.okrTermId } },
          objective: { connect: { id: input.objectiveId } },
          createdBy: { connect: { id: input.createdById } },
          targetValue: input.targetValue,
          unit: input.unit,
          currentValue: 0,
        },
      });
    }),
  updateKeyResult: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
        okrTermId: z.number(),
        objectiveId: z.number(),
        createdById: z.string(),
        targetValue: z.number(),
        unit: z.string(),
        currentValue: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.keyResult.update({
        where: { id: input.id },
        data: {
          name: input.name,
          okrTerm: { connect: { id: input.okrTermId } },
          objective: { connect: { id: input.objectiveId } },
          createdBy: { connect: { id: input.createdById } },
          targetValue: input.targetValue,
          unit: input.unit,
          currentValue: input.currentValue,
        },
      });
    }),
  deleteKeyResult: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.keyResult.delete({ where: { id: input.id } });
    }),
  getKeyResults: publicProcedure
    .input(
      z.object({
        okrTermId: z.number(),
        objectiveId: z.number(),
        createdById: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.keyResult.findMany({
        where: {
          AND: {
            okrTermId: input.okrTermId,
            objectiveId: input.objectiveId,
            createdById: input.createdById,
          },
        },
      });
    }),
});
