import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Shipment } from './shipment.entity';
import { ShipmentService } from './shipment.service';
import { CreateShipmentInput } from './dto/create-shipment.input';
import { UpdateShipmentInput } from './dto/update-shipment.input';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';

@Resolver(() => Shipment)
export class ShipmentResolver {
  constructor(private shipmentService: ShipmentService) {}

  @Query(() => [Shipment])
  @UseGuards(JwtAuthGuard)
  async shipments(): Promise<Shipment[]> {
    return this.shipmentService.findAll();
  }

  @Query(() => Shipment, { nullable: true })
  @UseGuards(JwtAuthGuard)
  async shipment(@Args('id') id: string): Promise<Shipment | null> {
    return this.shipmentService.findOne(id);
  }

  @Query(() => Shipment, { nullable: true })
  @UseGuards(JwtAuthGuard)
  async shipmentByTracking(@Args('trackingNumber') trackingNumber: string): Promise<Shipment | null> {
    return this.shipmentService.findByTrackingNumber(trackingNumber);
  }

  @Mutation(() => Shipment)
  @UseGuards(JwtAuthGuard)
  async createShipment(@Args('createShipmentInput') createShipmentInput: CreateShipmentInput): Promise<Shipment> {
    return this.shipmentService.create(createShipmentInput);
  }

  @Mutation(() => Shipment)
  @UseGuards(JwtAuthGuard)
  async updateShipment(
    @Args('id') id: string,
    @Args('updateShipmentInput') updateShipmentInput: UpdateShipmentInput,
  ): Promise<Shipment> {
    return this.shipmentService.update(id, updateShipmentInput);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async deleteShipment(@Args('id') id: string): Promise<boolean> {
    await this.shipmentService.remove(id);
    return true;
  }
}