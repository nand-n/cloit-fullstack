import { Global, Module } from '@nestjs/common';
import { CategoryModule } from './modules/catagory/category.module';

@Global()
@Module({
  imports: [
    CategoryModule
  ],
})
export class CoreModule {}
