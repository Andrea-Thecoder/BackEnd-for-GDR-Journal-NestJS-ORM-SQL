import { ApiProperty } from '@nestjs/swagger';
import { OmitType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class ApiResponseDto extends OmitType(CreateUserDto, ['password'] as const) {
  @ApiProperty({
    description: 'The unique ID of the user.',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The date when the user was created.',
    example: '2023-09-16T12:34:56.789Z',
  })
  createdAt:Date;

  @ApiProperty({
    description: 'The date when the user was last updated.',
    example: '2023-09-16T12:34:56.789Z',
  })
  updateAt:Date;

  // Aggiungi altri campi se necessario
}