import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shipment } from './shipment.entity';
import { ShipmentService } from './shipment.service';
import { ShipmentResolver } from './shipment.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Shipment])],
  providers: [ShipmentService, ShipmentResolver],
  exports: [ShipmentService],
})
export class ShipmentModule {}