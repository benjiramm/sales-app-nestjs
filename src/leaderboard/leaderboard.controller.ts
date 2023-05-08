import { Body, Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
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

    @UseGuards(AuthGuard)
    @Get(':date')
    @ApiOperation({description: 'get leaderboard of specific date'})
    @ApiResponse({status: 200})
    @ApiBearerAuth()
    get (@Param('date') date: string){
        return this.leaderboardService.getLeaderboard(new Date(date))
    }
}
