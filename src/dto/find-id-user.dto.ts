import { IsInt, IsPositive} from 'class-validator';
import { Type } from 'class-transformer';

export class finderIdDto {
    @IsInt()
    @IsPositive()
    @Type(()=> Number)
    id: number;
  }