import { z } from 'zod'
// Removed 'type Prisma' import as it's not being explicitly used for type annotations.
// If you need it for other Prisma-related types (e.g., Prisma.PostCreateInput), you can re-add it.

import { createTRPCRouter, protectedProcedure, publicProcedure } from '@/server/api/trpc'

export const postRouter = createTRPCRouter({
  hello: publicProcedure.input(z.object({ text: z.string(), somethingelse: z.string() })).query(({ input }) => {
    return {
      greeting: `Hello ${input.text}`,
    }
  }),

  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => { // Removed explicit return type annotation
      return ctx.db.post.create({
        data: {
          name: input.name,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      })
    }),

  getLatest: protectedProcedure.query(async ({ ctx }) => { // Removed explicit return type annotation
    const post = await ctx.db.post.findFirst({
      orderBy: { createdAt: 'desc' },
      where: { createdBy: { id: ctx.session.user.id } },
    })

    // Return the post directly. TRPC will handle the nullability based on Prisma's return type.
    return post
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return 'you can now see this secret message!'
  }),
})