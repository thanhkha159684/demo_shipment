import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('shipments')
export class Shipment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'tracking_number', unique: true, length: 100 })
  trackingNumber: string;

  @Column({ name: 'sender_name', length: 255 })
  senderName: string;

  @Column({ name: 'sender_address', type: 'text' })
  senderAddress: string;

  @Column({ name: 'receiver_name', length: 255 })
  receiverName: string;

  @Column({ name: 'receiver_address', type: 'text' })
  receiverAddress: string;

  @Column({ length: 50, default: 'pending' })
  status: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}