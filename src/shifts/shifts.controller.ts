import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
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

    @Get()
    @ApiOperation({summary: 'Get shift history for this week'})
    @ApiResponse({status: 200})
    getThisWeek() {
        return this.shiftsService.getThisWeek()
    }

    @UseGuards(AuthGuard)
    @Get(':date')
    @ApiOperation({description: 'get shift history of week including a specific date'})
    @ApiResponse({status: 200})
    @ApiBearerAuth()
    get (@Param('date') date: string){
        return this.shiftsService.getShiftsByDate(new Date(date))
    }
}
