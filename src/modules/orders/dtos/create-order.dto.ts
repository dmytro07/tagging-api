import { IsNumber, IsString, MaxLength, Min } from 'class-validator';
import { MIN_PRICE, ORDER_NAME_LENGTH } from '../consts/order.consts';
import { Trim } from 'src/modules/shared/decorators/trim.decorator';
import { ApiHideProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiHideProperty()
  userId: string;

  @Trim()
  @IsString()
  @MaxLength(ORDER_NAME_LENGTH)
  name: string;

  @Min(MIN_PRICE)
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  price: number;
}
