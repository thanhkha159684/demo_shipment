import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shipment } from './shipment.entity';
import { CreateShipmentInput } from './dto/create-shipment.input';
import { UpdateShipmentInput } from './dto/update-shipment.input';

@Injectable()
export class ShipmentService {
  constructor(
    @InjectRepository(Shipment)
    private shipmentRepository: Repository<Shipment>,
  ) {}

  async findAll(): Promise<Shipment[]> {
    return this.shipmentRepository.find();
  }

  async findOne(id: string): Promise<Shipment | null> {
    return this.shipmentRepository.findOne({ where: { id } });
  }

  async findByTrackingNumber(trackingNumber: string): Promise<Shipment | null> {
    return this.shipmentRepository.findOne({ where: { trackingNumber } });
  }

  async create(createShipmentInput: CreateShipmentInput): Promise<Shipment> {
    const shipment = this.shipmentRepository.create(createShipmentInput);
    return this.shipmentRepository.save(shipment);
  }

  async update(id: string, updateShipmentInput: UpdateShipmentInput): Promise<Shipment> {
    await this.shipmentRepository.update(id, updateShipmentInput);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.shipmentRepository.delete(id);
  }
}