import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import { ProductModule } from './product/product.module';
import { TaskModule } from './task/task.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    ProductModule,
    TaskModule,
    ConfirmDialogModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
