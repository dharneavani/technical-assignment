import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Task } from '../task/entities/task.entity';

import { Property } from '../property/entities/property.entity';

type ProductWithTasks = Product & { tasks?: Task[] };

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private _repository: Repository<Product>,
    @InjectRepository(Task) private _taskRepository: Repository<Task>,
    @InjectRepository(Task) private _propertyRepository: Repository<Property>,

  ) {}

 

  async create(createProductDto: any): Promise<Product> {
    const product = new Product();
    product.name = createProductDto.name;

    product.properties = createProductDto.properties.map((prop) => {
      const property = new Property();
      property.key = prop.key;
      property.value = prop.value;
      return property;
    });

    return this._repository.save(product);
  }

  async findAll() {
    const products = await this._repository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.tasks', 'task')
      .getMany();
  
    return products;
  }

  findOne(id: string) {
    return this._repository.findOneBy({ id });
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this._repository.save({ ...updateProductDto, id });
  }

  remove(id: string) {
    return this._repository.delete({ id });
  }
}
