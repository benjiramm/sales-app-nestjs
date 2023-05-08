import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { Log } from 'src/logs/schemas/logs.schema';
import { AddShiftDto } from './dtos/shifts.add-shift.dto';
import { ShiftsService } from './shifts.service';

@ApiTags('Shifts')
@Controller('shifts')
export class ShiftsController {
    constructor(private readonly shiftsService:ShiftsService){}

    @UseGuards(AuthGuard)
    @Post()
    @ApiOperation({summary: 'add multiple logs as a shift using the shifts DTO'})
    @ApiResponse({status: 201, type: [Log]})
    @ApiBearerAuth()
    add(@Body() addShiftDto: AddShiftDto, @Req() req) {
        return this.shiftsService.postShift(addShiftDto, req.user.sub)
    }
}
