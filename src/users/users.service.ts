import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dtos/users.create.dto';
@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private readonly model: Model<UserDocument> ){}

    async create(createUserDto: CreateUserDto){
        const user = await this.getUserByUsername(createUserDto.username)

        if(user) { throw new BadRequestException({message: "This user already exists"}) }


        return await new this.model(createUserDto).save()
    }

    async getUserByUsername( username: string): Promise<User>{
        return await this.model.findOne({username}).exec()
    }

    async getAllUsers() : Promise<Array<User>> {
        return await this.model.find().exec()
    }
}
