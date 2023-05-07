import { Module } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';
import { LeaderboardController } from './leaderboard.controller';
import { LogsModule } from 'src/logs/logs.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Log, LogSchema } from 'src/logs/schemas/logs.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: Log.name,schema: LogSchema}])],
  providers: [LeaderboardService, LogsModule],
  controllers: [LeaderboardController]
})
export class LeaderboardModule {}
