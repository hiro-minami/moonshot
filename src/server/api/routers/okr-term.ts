import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const okrTermRouter = createTRPCRouter({
  createOkrTerm: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        createdById: z.string(),
        startDate: z.date(),
        endDate: z.date(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.okrTerm.create({
        data: {
          name: input.name,
          createdBy: { connect: { id: input.createdById } },
          startDate: input.startDate,
          endDate: input.endDate,
        },
      });
    }),
  updateOkrTerm: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
        createdById: z.string(),
        startDate: z.date(),
        endDate: z.date(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.okrTerm.update({
        where: { id: input.id },
        data: {
          name: input.name,
          createdBy: { connect: { id: input.createdById } },
          startDate: input.startDate,
          endDate: input.endDate,
        },
      });
    }),
  updateEmoji: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        emoji: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      console.log(input);
      return ctx.db.okrTerm.update({
        where: { id: input.id },
        data: {
          emoji: input.emoji,
        },
      });
    }),
  deleteOkrTerm: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.okrTerm.delete({ where: { id: input.id } });
    }),
  getOkrTerms: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.okrTerm.findMany({
      orderBy: { id: "asc" },
    });
  }),
  getOkrTerm: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.okrTerm.findFirst({
        where: { id: input.id },
      });
    }),
  getCurrentOkrTerm: publicProcedure.query(async ({ ctx }) => {
    const today = new Date();
    return ctx.db.okrTerm.findFirst({
      where: {
        AND: {
          startDate: {
            lte: today,
          },
          endDate: {
            gte: today,
          },
        },
      },
    });
  }),
});
