import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Dayjs } from 'dayjs';
import { Model } from 'mongoose';
import { CreateLogDto } from './dtos/logs.create-log.dto';
import { Log, LogDocument } from './schemas/logs.schema';

@Injectable()
export class LogsService {
    constructor(@InjectModel(Log.name) private readonly model: Model<LogDocument>) {}

    async get(id : string) {
        return await this.model.findById(id)
    }

    async create(createLogDto: CreateLogDto, timestamp: Dayjs, author: string){
        const newLog = {
            ...createLogDto,
            timestamp: timestamp.format(),
            author: author
        }

        return await new this.model(newLog).save()
    }

    async update(id: string, createLogDto: CreateLogDto, user ){
        const log = await this.get(id)
        if(!log){
            throw new HttpException('Log document not found!', HttpStatus.NOT_FOUND)
        }

        if(!user.is_admin) {
            if(log.author != user.sub) {
                throw new UnauthorizedException({message: "Cannot modify an item if you didn't create it"})
            }
        }

        return await this.model.findByIdAndUpdate(id, createLogDto, {new: true})
    }

    async delete(id: string, user) {
        const log = await this.get(id)
        if(!log){
            throw new HttpException('Log document not found!', HttpStatus.NOT_FOUND)
        }

        if(!user.is_admin) {
            if(log.author != user.sub) {
                throw new UnauthorizedException({message: "Cannot delete an item if you didn't create it"})
            }
        }

        return await this.model.findByIdAndDelete(id)
    }
}
