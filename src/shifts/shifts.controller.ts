import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddShiftDto } from './dtos/shifts.add-shift.dto';
import { ShiftsService } from './shifts.service';

@ApiTags('Shifts')
@Controller('shifts')
export class ShiftsController {
    constructor(private readonly shiftsService:ShiftsService){}

    @Post()
    @ApiOperation({summary: 'add multiple logs as a shift using the shifts DTO'})
    add(@Body() addShiftDto: AddShiftDto) {
        return 
    }
}
