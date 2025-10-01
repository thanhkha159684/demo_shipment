import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ShipmentService } from '../services/shipment.service';
import { Shipment } from '../entities/shipment.entity';

@Controller('shipments')
export class ShipmentController {
  constructor(private readonly shipmentService: ShipmentService) {}

  @Get()
  async findAll(): Promise<Shipment[]> {
    return this.shipmentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Shipment> {
    return this.shipmentService.findOne(id);
  }

  @Get('tracking/:trackingNumber')
  async findByTrackingNumber(@Param('trackingNumber') trackingNumber: string): Promise<Shipment> {
    return this.shipmentService.findByTrackingNumber(trackingNumber);
  }

  @Post()
  async create(@Body() shipmentData: Partial<Shipment>): Promise<Shipment> {
    return this.shipmentService.create(shipmentData);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() shipmentData: Partial<Shipment>): Promise<Shipment> {
    return this.shipmentService.update(id, shipmentData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.shipmentService.remove(id);
  }
}