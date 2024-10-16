import { Controller, Post, Get, Param, Body, Delete, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('create-root')
  async createRootCategory(@Body() categoryData: { name: string }) {
    return this.categoryService.createRootCategory({ name: categoryData.name });
  }


  @Post('create-root-with-ancestors')
  async createCategoryWithChildren(@Body() categoryData: CreateCategoryDto) {
    return this.categoryService.createCategoryWithChildren(categoryData );
  }
  @Put('update/:id')
  async updateCategory(
    @Param('id') id: string,
    @Body() updateData: { name?: string; parentId?: string },
  ): Promise<any> {
    return this.categoryService.updateCategory(id, updateData, updateData.parentId);
  }
  
  @Get('/root-nodes')
  async getAllRootCategories() {
    return this.categoryService.getAllRootCategories();
  }


  @Post(':parentId/add-child')
  async addChildCategory(
    @Param('parentId') parentId: string,
    @Body() categoryData: any,
  ) {
    return this.categoryService.addChildCategory(parentId, { name: categoryData.name , id:categoryData.id});
  }

  @Get()
  async getAllCategories() {
    return this.categoryService.getAllCategories();
  }


  @Get(':categoryId/hierarchy')
  async getCategoryHierarchy(@Param('categoryId') categoryId: string) {
    return this.categoryService.getCategoryHierarchy(categoryId);
  }

  @Delete(':categoryId')
  async deleteCategory(@Param('categoryId') categoryId: string) {
    await this.categoryService.deleteCategory(categoryId);
    return { message: 'Category deleted successfully' };
  }
}
