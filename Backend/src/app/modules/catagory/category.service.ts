import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Category } from '@prisma/client';
import { CreateCategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async createRootCategory(data: Prisma.CategoryCreateInput): Promise<Category> {
    const category = await this.prisma.category.create({ data });

    await this.prisma.categoryClosure.create({
      data: {
        ancestorId: category.id,
        descendantId: category.id,
        depth: 0,
      },
    });

    return category;
  }

  async createCategoryWithChildren(
    categoryDto: CreateCategoryDto,
    parentId?: string,
  ): Promise<Category> {
    const newCategory = await this.prisma.category.create({
      data: {
        name: categoryDto.name,
        parentId: parentId, 
      },
    });
  
    await this.prisma.categoryClosure.create({
      data: {
        ancestorId: newCategory.id,
        descendantId: newCategory.id,
        depth: 0,
      },
    });
  
    if (parentId) {
      const parentAncestors = await this.prisma.categoryClosure.findMany({
        where: { descendantId: parentId },
      });
  
      const closureEntries = parentAncestors.map((ancestor) => ({
        ancestorId: ancestor.ancestorId,
        descendantId: newCategory.id,
        depth: ancestor.depth + 1, 
      }));
  
      for (const entry of closureEntries) {
        await this.prisma.categoryClosure.upsert({
          where: {
            ancestorId_descendantId: {
              ancestorId: entry.ancestorId,
              descendantId: entry.descendantId,
            },
          },
          create: entry,
          update: {}, 
        });
      }
    }
  
    if (categoryDto.children && categoryDto.children.length > 0) {
      for (const childDto of categoryDto.children) {
        await this.createCategoryWithChildren(childDto, newCategory.id);
      }
    }
  
    return newCategory;
  }
  

  async addChildCategory(
    parentId: string,
    data: Prisma.CategoryCreateInput,
  ): Promise<Category> {
    const parentCategory = await this.prisma.category.findUnique({
      where: { id: parentId },
    });
  
    if (!parentCategory) throw new Error('Parent category not found');
  
    const childCategory = await this.prisma.category.create({
      data: {
        ...data,
        parent: {
          connect: { id: parentCategory.id },  
        },
      },
    });
  
    const parentAncestors = await this.prisma.categoryClosure.findMany({
      where: { descendantId: parentCategory.id },
    });
  
    const closureEntries = parentAncestors.map((ancestor) => ({
      ancestorId: ancestor.ancestorId,
      descendantId: childCategory.id,
      depth: ancestor.depth + 1,
    }));
  
    closureEntries.push({
      ancestorId: childCategory.id,
      descendantId: childCategory.id,
      depth: 0,
    });
  
    await this.prisma.categoryClosure.createMany({ data: closureEntries });
  
    return childCategory;
  }
  
  async getAllCategories(): Promise<Category[]> {
    return this.prisma.category.findMany({
      include: {
        ancestors: true,
        descendants: true,
        children: true,
      },
    });
  }


    async getAllRootCategories(): Promise<Category[]> {
      return this.prisma.category.findMany({
        where:{
          parent:null
        },
        include: {
          ancestors: false,
          descendants: false,
          children: false,
        },
      });
    }

async getCategoryHierarchy(categoryId: string): Promise<Category[]> {
    const hierarchy = await this.prisma.categoryClosure.findMany({
      where: { ancestorId: categoryId },
      include: {
        descendant: true,
      },
      orderBy:[
  { depth: 'asc' },
  { descendant: { createdAt: 'asc' } }, 
],
    });
  

    const categoryMap: { [key: string]: any } = {};
  
    hierarchy.forEach(({ descendant ,depth , ancestorId , descendantId}) => {
      categoryMap[descendant.id] = { ...descendant,depth,ancestorId , descendantId, children: [] };
    });
  
    let root: Category[] = [];
  
    hierarchy.forEach(({ descendant }) => {
      const parentId = descendant.parentId;
  
      if (parentId) {
        if (categoryMap[parentId]) {
          categoryMap[parentId].children.push(categoryMap[descendant.id]);
        }
      } else {
        root.push(categoryMap[descendant.id]);
      }
    });
  
    return root;
  }
  
async updateCategory(
    categoryId: string,
    updateData: Prisma.CategoryUpdateInput,
    newParentId?: string
  ): Promise<Category> {
    const existingCategory = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });
  
    if (!existingCategory) {
      throw new Error('Category not found');
    }
  
    const updatedCategory = await this.prisma.category.update({
      where: { id: categoryId },
      data: updateData,
      include:{
        children:true,
        descendants:true,
        ancestors:true
      }
    });
  
    if (newParentId && newParentId !== existingCategory.parentId) {
      await this.prisma.categoryClosure.deleteMany({
        where: {
          descendantId: categoryId,
          ancestorId: { not: categoryId }, 
        },
      });
  
      const parentAncestors = await this.prisma.categoryClosure.findMany({
        where: { descendantId: newParentId },
      });
  
      const newClosureEntries = parentAncestors.map((ancestor) => ({
        ancestorId: ancestor.ancestorId,
        descendantId: categoryId,
        depth: ancestor.depth + 1,
      }));
  
      newClosureEntries.push({
        ancestorId: updatedCategory.id,
        descendantId: updatedCategory.id,
        depth: 0,
      });
  
      await this.prisma.categoryClosure.createMany({
        data: newClosureEntries,
      });
    }
  
    return updatedCategory;
  }
  
  async deleteCategory(categoryId: string): Promise<Category | null> {
    const category = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });
  
    if (!category) {
      throw new Error(`Category with ID ${categoryId} not found.`);
    }
  
    const descendantClosures = await this.prisma.categoryClosure.findMany({
      where: { ancestorId: categoryId },
      select: { descendantId: true },
    });
  
    let descendantIds = descendantClosures.map(closure => closure.descendantId);
    descendantIds.push(categoryId); 
  
    await this.prisma.categoryClosure.deleteMany({
      where: {
        OR: [
          { ancestorId: { in: descendantIds } },
          { descendantId: { in: descendantIds } },
        ],
      },
    });
  
    await this.prisma.category.deleteMany({
      where: { id: { in: descendantIds } },
    });
  
    return category;
  }
  
}
