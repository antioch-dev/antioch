/* eslint-disable no-var */
import { PrismaClient } from "@prisma/client"
import { env } from "@/env"

declare global {
  var prisma: PrismaClient | undefined
}

const prismaClient = new PrismaClient({
  log: env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
})

export const db = global.prisma ?? prismaClient

if (env.NODE_ENV !== "production") {
  global.prisma = db
}
