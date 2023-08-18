import * as dayjs from 'dayjs';
import { PipelineStage } from 'mongoose';

export const getPipelineWithDate = (date: Date): PipelineStage[] => {
  const startOfWeek = dayjs(date).startOf('week').toDate();
  const endOfWeek = dayjs(date).endOf('week').toDate();

  return [
    // UNCOMMENT ON PRODUCTION
    /* 
    {
      $match: {
        date: {
          $gte: startOfWeek,
          $lte: endOfWeek,
        },
      },
    },
    */
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
        from: 'items',
        localField: 'item',
        foreignField: '_id',
        as: 'item_doc',
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
      $project: {
        _id: 0,
        staff_name: 1,
        item_name: 1,
        amount: 1,
        value: 1,
        icon: 1,
        staff: 1,
        item: 1,
      },
    },
    {
      $addFields: {
        logPoints: {
          $multiply: ['$value', '$amount'],
        },
      },
    },
    {
      $group: {
        _id: {
          staff: '$staff',
          item: '$item',
        },
        total_items: {
          $sum: '$amount',
        },
        data: {
          $addToSet: {
            item_name: '$item_name',
            icon: '$icon',
            staff_name: '$staff_name',
          },
        },
        points: {
          $sum: '$logPoints',
        },
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [
            {
              $arrayElemAt: ['$data', 0],
            },
            '$$ROOT',
          ],
        },
      },
    },
    {
      $project: {
        data: 0,
      },
    },
    {
      $group: {
        _id: '$_id.staff',
        score: {
          $sum: '$points',
        },
        sales: {
          $addToSet: {
            item_name: '$item_name',
            icon: '$icon',
            total_amount: '$total_items',
            item: '$_id.item',
          },
        },
        data: {
          $addToSet: {
            staff_name: '$staff_name',
          },
        },
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [
            {
              $arrayElemAt: ['$data', 0],
            },
            '$$ROOT',
          ],
        },
      },
    },
    {
      $project: {
        data: 0,
      },
    },
    {
      $sort: {
        score: -1,
      },
    },
  ];
};
