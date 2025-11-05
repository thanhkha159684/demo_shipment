import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateShipmentInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  trackingNumber: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  senderName: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  senderAddress: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  receiverName: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  receiverAddress: string;

  @Field({ nullable: true })
  @IsString()
  status?: string;
}