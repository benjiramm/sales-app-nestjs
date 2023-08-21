import * as dayjs from 'dayjs';
import { PipelineStage } from 'mongoose';

export const getShiftsPipelineWithDate = (date: Date): PipelineStage[] => {
  const startOfWeek = dayjs(date).startOf('week').toDate();
  const endOfWeek = dayjs(date).endOf('week').toDate();
  return [
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
      $lookup: {
        from: 'users',
        localField: 'author',
        foreignField: '_id',
        as: 'author_doc',
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
            {
              $arrayElemAt: ['$author_doc', 0],
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
          author: '$author',
          username: '$username',
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
          author: '$_id.author',
          username: '$_id.username',
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
          author: '$_id.author',
          username: '$_id.username',
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
            author: '$_id.author',
            username: '$_id.username',
            staffs: '$staff',
          },
        },
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [
            {
              date: '$_id.date',
              shift_type: '$_id.shift_type',
            },
            '$$ROOT',
          ],
        },
      },
    },
    {
      $unset: '_id',
    },
    {
      $sort: {
        date: -1,
        shift_type: 1,
      },
    },
  ];
};
