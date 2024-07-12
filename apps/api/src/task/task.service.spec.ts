

import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Product } from '../product/entities/product.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { NotFoundException } from '@nestjs/common';
import { UpdateTaskDto } from './dto/update-task.dto';





describe('TaskService', () => {
  let taskService: TaskService;
  let taskRepository: Repository<Task>;
  let productRepository: Repository<Product>;



  beforeEach(async () => {
    const repositoryToken = getRepositoryToken(Task);
    const module: TestingModule = await Test.createTestingModule({
      providers: [
                TaskService,
                {
                  provide: repositoryToken,
                  useClass: Repository,
                  useValue: {
                    save: jest.fn(),
                    find: jest.fn(),
                    findOneBy: jest.fn(),
                    update: jest.fn(),
                    delete: jest.fn(),
                  }
                },
                {
                  provide: getRepositoryToken(Product),
                  useClass: Repository,
                },
              ],
    }).compile();

    taskService = module.get<TaskService>(TaskService);
    taskRepository = module.get<Repository<Task>>(getRepositoryToken(Task));
    productRepository = module.get<Repository<Product>>(getRepositoryToken(Product));

  });

  it('should be defined', () => {
    expect(taskService).toBeDefined();
  });

    describe('create', () => {
    it('should call repository.save with the createTaskDto', async () => {
      const createTaskDto: CreateTaskDto = {
        title: 'Test Task',
        description: 'This is a test task for product 123',
        dueAt: new Date().toISOString(),
        productId: '123', 
      };

      const productMock = new Product();
      productMock.id = '123';
      productMock.name = 'Test Product';

      jest.spyOn(productRepository, 'findOne').mockResolvedValue(productMock);
      jest.spyOn(taskRepository, 'save').mockImplementation(task => Promise.resolve({ id: '123', ...task } as Task));

      const createdTask = await taskService.create(createTaskDto);

      expect(createdTask).toBeDefined();
      expect(createdTask.title).toEqual(createTaskDto.title);
      expect(createdTask.description).toEqual(createTaskDto.description);
      expect(createdTask.dueAt.toISOString()).toEqual(createTaskDto.dueAt);
      expect(createdTask.product).toEqual(productMock);
    });

        it('should throw NotFoundException if product not found', async () => {
      const createTaskDto: CreateTaskDto = {
        title: 'Test Task',
        description: 'This is a test task',
        dueAt: new Date().toISOString(),
        productId: '999', // Using an invalid product ID
      };

      jest.spyOn(productRepository, 'findOne').mockResolvedValue(null);

      await expect(taskService.create(createTaskDto)).rejects.toThrowError(NotFoundException);
    });
  });

  
  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const tasks: Task[] = [
        { id: '1', title: 'Task 1', description: 'Task 1 description', dueAt: new Date(),createdAt: new Date(), product: null },
        { id: '2', title: 'Task 2', description: 'Task 2 description', dueAt: new Date(),createdAt: new Date(), product: null },
      ];

      jest.spyOn(taskRepository, 'find').mockResolvedValue(tasks);

      const foundTasks = await taskService.findAll();

      expect(foundTasks).toEqual(tasks);
    });
  });

    describe('update', () => {
    it('should update a task', async () => {
      const taskId = '1';
      const updateTaskDto: UpdateTaskDto = { title: 'Updated Task Title', description: 'Updated description' };

      jest.spyOn(taskRepository, 'save').mockImplementation(task => Promise.resolve({ id: taskId, ...task } as Task));

      const updatedTask = await taskService.update(taskId, updateTaskDto);

      expect(updatedTask).toBeDefined();
      expect(updatedTask.id).toEqual(taskId);
      expect(updatedTask.title).toEqual(updateTaskDto.title);
      expect(updatedTask.description).toEqual(updateTaskDto.description);
    });
  });


  describe('remove', () => {
    it('should delete a task', async () => {
      const taskId = '1';

      jest.spyOn(taskRepository, 'delete').mockResolvedValue({ raw: [], affected: 1 });

      const deleteResult = await taskService.remove(taskId);

      expect(deleteResult).toBeDefined();
      expect(deleteResult.affected).toBe(1);
    });
  });
});

