import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
@Entity('shipments')
export class Shipment {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ name: 'tracking_number', unique: true, length: 100 })
  trackingNumber: string;

  @Field()
  @Column({ name: 'sender_name', length: 255 })
  senderName: string;

  @Field()
  @Column({ name: 'sender_address', type: 'text' })
  senderAddress: string;

  @Field()
  @Column({ name: 'receiver_name', length: 255 })
  receiverName: string;

  @Field()
  @Column({ name: 'receiver_address', type: 'text' })
  receiverAddress: string;

  @Field()
  @Column({ length: 50, default: 'pending' })
  status: string;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}