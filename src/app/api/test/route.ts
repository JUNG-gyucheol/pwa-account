import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const dynamic = "force-static";

export async function GET() {
  const data = await prisma.accountDate.findMany({
    include: {
      list: {
        select: {
          title: true,
          amount: true,
        },
      },
    },
  });

  return new Response(JSON.stringify(data), {
    status: 200,
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  await prisma.accountDate.upsert({
    where: {
      date: body.date,
    },
    update: {},
    create: {
      date: body.date,
    },
  });

  await prisma.account.create({
    data: {
      title: body.title,
      amount: Number(body.amount),
      dateId: body.date,
    },
  });

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    statusText: "ok",
  });
}
