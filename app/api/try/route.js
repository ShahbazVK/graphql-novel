import { prismaClientSingleton } from "../../../prisma/db";

export async function POST(req) {
  const data = await req.json();
  const resp = await prismaClientSingleton.novel.create({
    data: { ...data, authors: { create: data.authors } },
  });
  return Response.json(resp);
}
