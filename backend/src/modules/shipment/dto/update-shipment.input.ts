import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateShipmentInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  senderName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  senderAddress?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  receiverName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  receiverAddress?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  status?: string;
}