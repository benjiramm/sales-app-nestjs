import { ApiProperty } from '@nestjs/swagger';

export class UserEditDto {
  @ApiProperty({ description: 'user name', example: 'Rut' })
  username: string;
  @ApiProperty({ description: 'is admin', example: 'true' })
  is_admin: boolean;
}
