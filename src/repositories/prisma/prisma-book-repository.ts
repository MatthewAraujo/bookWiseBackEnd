import { Prisma } from "@prisma/client";
import { BookRepository } from "../book-repository";
import { prisma } from "@/lib/prisma";

export class PrismaBookRepository implements BookRepository{

  async create(data: Prisma.BookCreateInput){
    const book = await prisma.book.create({
      data,
    })
    return book
  }


  async findBookByName(name:string){
    const book = await prisma.book.findFirst({
      where: {
        name,
      }
    })

    return book
  }


}