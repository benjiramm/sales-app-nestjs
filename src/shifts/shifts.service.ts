import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as dayjs from 'dayjs';
import { Model, Mongoose, Types } from 'mongoose';
import { LogsService } from 'src/logs/logs.service';
import { Log, LogDocument } from 'src/logs/schemas/logs.schema';
import { AddShiftDto } from './dtos/shifts.add-shift.dto';
import { getShiftsPipelineWithDate } from './aggregations/shifts.aggregation';
import { access } from 'fs';

@Injectable()
export class ShiftsService {
  constructor(
    @InjectModel(Log.name) private readonly model: Model<LogDocument>,
  ) {}

  async postShift(addShiftDto: AddShiftDto, author: string) {
    const logsToAdd = [];

    const timestamp = dayjs();
    addShiftDto.staff.map((staff_member) => {
      staff_member.sales.map((sale) => {
        if (sale.amount > 0) {
          const newLog = {
            ...sale, // item_id + amount
            shift_type: addShiftDto.shift_type,
            date: new Date(addShiftDto.date),
            staff: staff_member.staff,
            timestamp: timestamp,
            author: author,
          };

          logsToAdd.push(newLog);
        }
      });
    });

    return await this.model.insertMany(logsToAdd);
  }

  async getThisWeek() {
    return await this.getShiftsByDate(new Date());
  }

  async getShiftsByDate(date: Date) {
    return await this.model.aggregate(getShiftsPipelineWithDate(date));
  }

  async deleteShift(date: Date, shift_type: string, user) {
    if (!user.is_admin) {
      throw new UnauthorizedException({
        message: "Cannot delete a shift if you're not an admin",
      });
    }

    return await this.model.deleteMany({ date, shift_type });
  }

  async deleteCluster(date: Date, shift_type: string, timestamp: Date, user) {
    const cluster = await this.model.findOne({ date, shift_type, timestamp });

    if (!user.is_admin) {
      if (!cluster.author._id.equals(user.sub)) {
        throw new UnauthorizedException({
          message:
            "Cannot delete a cluster if you're not an admin or if you didn't insert it",
        });
      }
    }

    return await this.model.deleteMany({ date, shift_type, timestamp });
  }

  async deleteStaffRow(
    date: Date,
    shift_type: string,
    timestamp: Date,
    staff: string,
    user,
  ) {
    const staff_row = await this.model.findOne({
      date,
      shift_type,
      timestamp,
      staff,
    });

    if (!user.is_admin) {
      if (!staff_row.author._id.equals(user.sub)) {
        throw new UnauthorizedException({
          message:
            "Cannot delete a staff row if you're not an admin or if you didn't insert it",
        });
      }
    }

    return await this.model.deleteMany({ date, shift_type, timestamp, staff });
  }
}
