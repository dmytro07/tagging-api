import { IsNumber, IsString, MaxLength, Min } from 'class-validator';
import { MIN_PRICE, ORDER_NAME_LENGTH } from '../consts/order.consts';

export class UpdateOrderDto {
  @IsString()
  @MaxLength(ORDER_NAME_LENGTH)
  name: string;

  @Min(MIN_PRICE)
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  price: number;
}
