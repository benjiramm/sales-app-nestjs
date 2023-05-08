import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as dayjs from 'dayjs';
import { Model } from 'mongoose';
import { LogsService } from 'src/logs/logs.service';
import { Log, LogDocument } from 'src/logs/schemas/logs.schema';
import { AddShiftDto } from './dtos/shifts.add-shift.dto';

@Injectable()
export class ShiftsService {
    constructor(@InjectModel(Log.name) private readonly model: Model<LogDocument>){}

    async postShift(addShiftDto: AddShiftDto, author: string) {

        const logsToAdd = []

        const timestamp = dayjs()
        addShiftDto.staff.map((staff_member) => {
            staff_member.sales.map((sale) => {
                const newLog = {
                    ...sale, // item_id + amount
                    shift_type: addShiftDto.shift_type,
                    date: new Date(addShiftDto.date),
                    staff: staff_member.staff,
                    timestamp: timestamp,
                    author: author,
                }

                logsToAdd.push(newLog)
            })
        })
        

        return await this.model.insertMany(logsToAdd)
    }


}
