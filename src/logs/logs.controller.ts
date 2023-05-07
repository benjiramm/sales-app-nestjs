import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateLogDto } from './dtos/logs.create-log.dto';
import { LogsService } from './logs.service';
import { Log } from './schemas/logs.schema';
import * as dayjs from 'dayjs';


@ApiTags('Logs')
@Controller('logs')
export class LogsController {
    constructor(private readonly logsService: LogsService) {}

    @UseGuards(AuthGuard)
    @ApiOperation({summary: 'create a new log'})
    @ApiResponse({status: 201, type: Log})
    @ApiBearerAuth()
    @Post()
    create(@Body() createLogDto: CreateLogDto, @Req() req) {
        const now = dayjs()
        return this.logsService.create(createLogDto, now, req.user.sub)
    }

    @UseGuards(AuthGuard)
    @ApiOperation({summary: 'get a log by id'})
    @ApiResponse({status: 200, type: Log})
    @ApiBearerAuth()
    @Get(':log_id')
    get(@Param('log_id') log_id:string){
        return this.logsService.get(log_id)
    }

    @UseGuards(AuthGuard)
    @ApiOperation({summary: 'update log by id'})
    @ApiResponse({status: 200, type: Log})
    @ApiBearerAuth()
    @Put(':log_id')
    update(@Param('log_id') log_id: string, @Body() createLogDto:CreateLogDto, @Req() req){
        return this.logsService.update(log_id,createLogDto,req.user)
    }

    @UseGuards(AuthGuard)
    @ApiOperation({summary: 'delete log by id'})
    @ApiResponse({status: 200, type: Log})
    @ApiBearerAuth()
    @Delete(':log_id')
    delete(@Param('log_id') log_id: string, @Req() req) {
        return this.logsService.delete(log_id, req.user)
    }
}
