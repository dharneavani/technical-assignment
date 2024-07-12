import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../product/entities/product.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private _repository: Repository<Task>,
    @InjectRepository(Product) private _productRepository: Repository<Product>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = new Task();
    task.title = createTaskDto.title;
    task.description = createTaskDto.description;
    task.dueAt = new Date(createTaskDto.dueAt);

    if (createTaskDto.productId) {
      const product = await this._productRepository.findOne({ where: { id: createTaskDto.productId } });
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      task.product = product; 
    }

    return this._repository.save(task);
  }

  findAll() {
    return this._repository.find();
  }

  findOne(id: string) {
    return this._repository.findOneBy({ id });
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    return this._repository.save({ ...updateTaskDto, id });
  }

  remove(id: string) {
    return this._repository.delete({ id });
  }
}
