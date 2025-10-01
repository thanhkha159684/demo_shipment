import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shipment } from '../entities/shipment.entity';

@Injectable()
export class ShipmentService {
  constructor(
    @InjectRepository(Shipment)
    private shipmentRepository: Repository<Shipment>,
  ) {}

  async findAll(): Promise<Shipment[]> {
    return this.shipmentRepository.find();
  }

  async findOne(id: string): Promise<Shipment> {
    return this.shipmentRepository.findOne({ where: { id } });
  }

  async findByTrackingNumber(trackingNumber: string): Promise<Shipment> {
    return this.shipmentRepository.findOne({ where: { trackingNumber } });
  }

  async create(shipmentData: Partial<Shipment>): Promise<Shipment> {
    const shipment = this.shipmentRepository.create(shipmentData);
    return this.shipmentRepository.save(shipment);
  }

  async update(id: string, shipmentData: Partial<Shipment>): Promise<Shipment> {
    await this.shipmentRepository.update(id, shipmentData);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.shipmentRepository.delete(id);
  }
}