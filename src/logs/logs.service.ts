import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as dayjs from 'dayjs';
import mongoose, { Schema, Model } from 'mongoose';
import { CreateLogDto } from './dtos/logs.create-log.dto';
import { Log, LogDocument } from './schemas/logs.schema';

@Injectable()
export class LogsService {
    constructor(@InjectModel(Log.name) private readonly model: Model<LogDocument>) {}

    async get(id : string) {
        return await this.model.findById(id)
    }

    // timestamp is a parameter because I want to be able to add multiple shifts as one and them having exactly the same timestamp
    async create(createLogDto: CreateLogDto, timestamp: dayjs.Dayjs, author: string){
        const newLog = {
            ...createLogDto,
            date: new Date(createLogDto.date),
            timestamp: timestamp,
            author: author
        }
        const added = await new this.model(newLog).save()

        console.log(added)
        return added
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
