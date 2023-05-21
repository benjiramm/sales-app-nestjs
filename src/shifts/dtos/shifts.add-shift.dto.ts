import { ApiProperty } from '@nestjs/swagger';

export class SaleInStaff {
  @ApiProperty({ description: 'item id', example: '<item_id>' })
  item: string;

  @ApiProperty({
    description: 'amount of items sold during shift',
    example: '3',
  })
  amount: number;
}

export class StaffInShift {
  @ApiProperty({ description: 'staff id', example: '<staff_id>' })
  staff: string;

  @ApiProperty({
    description: 'items sold by staff in shift',
    type: [SaleInStaff],
  })
  sales: SaleInStaff[];
}

export class AddShiftDto {
  @ApiProperty({
    description: 'type of shift (morning/evening)',
    example: 'evening',
  })
  shift_type: string;

  @ApiProperty({
    description: 'corresponding date of shift',
    example: '2023-5-6',
  }) // YYYY-MM-DD
  date: string;

  @ApiProperty({
    description: 'staff that worked in the shift',
    type: [StaffInShift],
  })
  staff: StaffInShift[];
}
