import { Body, Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LeaderboardService } from './leaderboard.service';

@ApiTags('Leaderboard')
@Controller('leaderboard')
export class LeaderboardController {
    constructor(private readonly leaderboardService: LeaderboardService){}

    @Get()
    @ApiOperation({description: 'get leaderboard'})
    @ApiResponse({status: 200})
    getToday (){
        return this.leaderboardService.getThisWeek()
    }

    @Get(':date')
    @ApiOperation({description: 'get leaderboard of specific date'})
    @ApiResponse({status: 200})
    get (@Param('date') date: string){
        return this.leaderboardService.getLeaderboard(new Date(date))
    }
}
