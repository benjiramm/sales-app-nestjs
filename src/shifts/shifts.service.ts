import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as dayjs from 'dayjs';
import { Model } from 'mongoose';
import { LogsService } from 'src/logs/logs.service';
import { Log, LogDocument } from 'src/logs/schemas/logs.schema';
import { AddShiftDto } from './dtos/shifts.add-shift.dto';

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
        const newLog = {
          ...sale, // item_id + amount
          shift_type: addShiftDto.shift_type,
          date: new Date(addShiftDto.date),
          staff: staff_member.staff,
          timestamp: timestamp,
          author: author,
        };

        logsToAdd.push(newLog);
      });
    });

    return await this.model.insertMany(logsToAdd);
  }

  async getThisWeek() {
    return await this.getShiftsByDate(new Date());
  }

  async getShiftsByDate(date: Date) {
    const startOfWeek = dayjs(date).startOf('week').toDate();
    const endOfWeek = dayjs(date).endOf('week').toDate();

    return await this.model.aggregate([
      {
        $match: {
          date: {
            $gte: startOfWeek,
            $lte: endOfWeek,
          },
          timestamp: {
            $exists: true,
          },
        },
      },
      {
        $lookup: {
          from: 'items',
          localField: 'item',
          foreignField: '_id',
          as: 'item_doc',
        },
      },
      {
        $lookup: {
          from: 'staffs',
          localField: 'staff',
          foreignField: '_id',
          as: 'staff_doc',
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              {
                $arrayElemAt: ['$staff_doc', 0],
              },
              {
                $arrayElemAt: ['$item_doc', 0],
              },
              '$$ROOT',
            ],
          },
        },
      },
      {
        $addFields: {
          value: {
            $cond: {
              if: {
                $eq: ['$shift_type', 'morning'],
              },
              then: '$value_morning',
              else: '$value_evening',
            },
          },
        },
      },
      {
        $addFields: {
          log_points: {
            $multiply: ['$value', '$amount'],
          },
        },
      },
      {
        $group: {
          _id: {
            timestamp: '$timestamp',
            staff: '$staff',
            staff_name: '$staff_name',
            item: '$item',
            item_name: '$item_name',
            amount: '$amount',
            log_points: '$log_points',
            log: '$_id',
            date: '$date',
            shift_type: '$shift_type',
            icon: '$icon',
          },
        },
      },
      {
        $group: {
          _id: {
            timestamp: '$_id.timestamp',
            staff: '$_id.staff',
            staff_name: '$_id.staff_name',
            shift_type: '$_id.shift_type',
            date: '$_id.date',
          },
          sales: {
            $addToSet: {
              icon: '$_id.icon',
              item: '$_id.item',
              item_name: '$_id.item_name',
              amount: '$_id.amount',
              log_points: '$_id.log_points',
              log: '$_id.log',
            },
          },
        },
      },
      {
        $group: {
          _id: {
            timestamp: '$_id.timestamp',
            date: '$_id.date',
            shift_type: '$_id.shift_type',
          },
          staff: {
            $addToSet: {
              staff: '$_id.staff',
              staff_name: '$_id.staff_name',
              shift_points: {
                $sum: '$sales.log_points',
              },
              sales: '$sales',
            },
          },
        },
      },
      {
        $group: {
          _id: {
            date: '$_id.date',
            shift_type: '$_id.shift_type',
          },
          clusters: {
            $addToSet: {
              timestamp: '$_id.timestamp',
              staffs: '$staff',
            },
          },
        },
      },
      {
        $sort: {
          date: -1,
          shift_type: -1,
        },
      },
    ]);
  }
}
