import { ApiProperty } from '@nestjs/swagger';

export class CreateLogDto {
  @ApiProperty({ description: 'id of staff who sold', example: '<staff_id>' })
  staff: string;

  @ApiProperty({ description: 'id of item sold', example: '<item_id>' })
  item: string;

  @ApiProperty({
    description: 'type of shift (morning/evening)',
    example: 'evening',
  })
  shift_type: string;

  @ApiProperty({
    description: 'amount of items sold during shift',
    example: '3',
  })
  amount: number;

  @ApiProperty({
    description: 'corresponding date of shift',
    example: '2023-5-6',
  }) // YYYY-MM-DD
  date: string;
}
