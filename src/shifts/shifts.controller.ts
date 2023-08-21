import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { Log } from 'src/logs/schemas/logs.schema';
import { AddShiftDto } from './dtos/shifts.add-shift.dto';
import { ShiftsService } from './shifts.service';

@ApiTags('Shifts')
@Controller('shifts')
export class ShiftsController {
  constructor(private readonly shiftsService: ShiftsService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({
    summary: 'add multiple logs as a shift using the shifts DTO',
  })
  @ApiResponse({ status: 201, type: [Log] })
  @ApiBearerAuth()
  add(@Body() addShiftDto: AddShiftDto, @Req() req) {
    return this.shiftsService.postShift(addShiftDto, req.user.sub);
  }

  @Get()
  @ApiOperation({ summary: 'Get shift history for this week' })
  @ApiResponse({ status: 200 })
  getThisWeek() {
    return this.shiftsService.getThisWeek();
  }

  @UseGuards(AuthGuard)
  @Get(':date')
  @ApiOperation({
    description: 'get shift history of week including a specific date',
  })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  get(@Param('date') date: string) {
    return this.shiftsService.getShiftsByDate(new Date(date));
  }

  // DELETE shift (admin only)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'delete shift by date & type' })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  @Delete(':date/:shift_type')
  deleteShift(
    @Param('date') date: string,
    @Param('shift_type') shift_type: string,
    @Req() req,
  ) {}

  // DELETE cluster (admin and author only)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'delete cluster by date, type, and timestamp' })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  @Delete(':date/:shift_type/:timestamp')
  deleteCluster(
    @Param('date') date: string,
    @Param('shift_type') shift_type: string,
    @Param('timestamp') timestamp: string,
    @Req() req,
  ) {}

  // DELETE row (admin and author only)
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'delete staff row by timestamp, date, type, and staff_id',
  })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  @Delete(':date/:shift_type/:timestamp/:staff_id')
  deleteShiftRow(
    @Param('date') date: string,
    @Param('shift_type') shift_type: string,
    @Param('timestamp') timestamp: string,
    @Param('staff_id') staff_id: string,
    @Req() req,
  ) {}
}
