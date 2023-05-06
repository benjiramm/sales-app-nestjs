import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateItemDto } from './dtos/items.add-item.dto';
import { Item, ItemDocument } from './schemas/items.schema';

@Injectable()
export class ItemsService {
    constructor(@InjectModel(Item.name) private readonly model: Model<ItemDocument>){}

    async getAll(){
        return await this.model.find()
    }

    async getById(id : string){
        const item = await this.model.findById(id)
        if(!item) {
            throw new HttpException('Item not found', HttpStatus.NOT_FOUND)
        }
        return item
    }

    async create(createItemDto: CreateItemDto){
        const item = await this.getByName(createItemDto.name)
        if (item) {
            throw new HttpException('Item with same name already exists!', HttpStatus.BAD_REQUEST)
        }
        return await new this.model(createItemDto).save()
    }

    async update(id:string, createItemDto: CreateItemDto){
        const item = await this.getById(id)
        if(!item) {
            throw new HttpException('Item not found', HttpStatus.NOT_FOUND)
        }

        return await this.model.findByIdAndUpdate(id,createItemDto,{new:true})
    }

    private async getByName(item_name : string){
        return await this.model.findOne({name: item_name})
    }

    async delete(id: string){
        const item = await this.getById(id)
        if(!item) {
            throw new HttpException('Item not found', HttpStatus.NOT_FOUND)
        }

        return await this.model.findByIdAndDelete(id)
    }
}
