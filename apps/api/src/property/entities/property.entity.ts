import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from '../../product/entities/product.entity'; // Adjust the import based on your project structure

@Entity()
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string;

  @Column()
  value: string;

  @ManyToOne(() => Product, (product) => product.properties, { onDelete: 'CASCADE' })
  product: Product;
}
