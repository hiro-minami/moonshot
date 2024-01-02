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
  createKeyResults: publicProcedure
    .input(
      z.object({
        keyResults: z.array(
          z.object({
            name: z.string(),
            okrTermId: z.number(),
            objectiveId: z.number(),
            createdById: z.string(),
            targetValue: z.number(),
            unit: z.string(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.keyResult.createMany({
        data: input.keyResults.map((keyResult) => {
          return {
            name: keyResult.name,
            okrTermId: keyResult.okrTermId,
            objectiveId: keyResult.objectiveId,
            createdById: keyResult.createdById,
            targetValue: keyResult.targetValue,
            unit: keyResult.unit,
            currentValue: 0,
          };
        }),
      });
    }),
  updateKeyResult: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
        targetValue: z.number(),
        unit: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.keyResult.update({
        where: { id: input.id },
        data: {
          name: input.name,
          targetValue: input.targetValue,
          unit: input.unit,
        },
      });
    }),
  checkin: publicProcedure
    .input(
      z.array(
        z.object({
          id: z.number(),
          currentValue: z.number(),
        }),
      ),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.$transaction(
        input.map((keyResult) => {
          return ctx.db.keyResult.update({
            where: { id: keyResult.id },
            data: {
              currentValue: keyResult.currentValue,
            },
          });
        }),
      );
    }),
  deleteKeyResult: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.keyResult.delete({ where: { id: input.id } });
    }),
  getKeyResultById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.keyResult.findUnique({
        where: { id: input.id },
        include: {
          tasks: {
            orderBy: [{ dueDate: "asc" }, { id: "asc" }],
          },
        },
      });
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
        include: {
          tasks: {
            orderBy: [{ dueDate: "asc" }, { id: "asc" }],
          },
        },
      });
    }),
});
