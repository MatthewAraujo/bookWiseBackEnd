import { Category, Prisma } from "@prisma/client";

export interface CategoryRepository {
  create(data: Prisma.CategoryCreateInput): Promise<Category>;
  findByName(id: string): Promise<Category | null>;
}