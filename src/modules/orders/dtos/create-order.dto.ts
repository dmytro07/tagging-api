import { IsNumber, IsString, IsUUID, MaxLength, Min } from 'class-validator';
import { MIN_PRICE, ORDER_NAME_LENGTH } from '../consts/order.consts';
import { UserExists } from 'src/modules/users/validators/user-exists.validator';

export class CreateOrderDto {
  @IsUUID()
  @UserExists()
  userId: string;

  @IsString()
  @MaxLength(ORDER_NAME_LENGTH)
  name: string;

  @Min(MIN_PRICE)
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  price: number;
}
