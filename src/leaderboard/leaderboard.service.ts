import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage } from 'mongoose';
import { Log, LogDocument } from 'src/logs/schemas/logs.schema';
import * as dayjs from 'dayjs';
import { getPipelineWithDate } from './aggregations/leaderboard.aggregation';

@Injectable()
export class LeaderboardService {
  constructor(
    @InjectModel(Log.name) private readonly model: Model<LogDocument>,
  ) {}

  async getLeaderboard(date: Date) {
    return await this.getLeaderboardFromDate(date);
  }

  async getThisWeek() {
    return await this.getLeaderboardFromDate(new Date());
  }

  private async getLeaderboardFromDate(date: Date) {
    return await this.model.aggregate(getPipelineWithDate(date));
  }
}
