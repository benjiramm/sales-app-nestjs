import { BadRequestException, Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { LoginUserDto } from 'src/auth/dtos/auth.login-user.dto';
import { hash } from 'bcrypt';
@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private readonly model: Model<UserDocument> ){}

    async create(loginUserDto: LoginUserDto){
        const user = await this.getUserByUsername(loginUserDto.username)

        if(user) { throw new BadRequestException({message: "This user already exists"}) }
        const hashedPassword = await hash(loginUserDto.password, 10)
        const newUser = {
            username: loginUserDto.username,
            password: hashedPassword
        }

        return await new this.model(newUser).save()
    }

    async getUserByUsername( username: string): Promise<User>{
        return await this.model.findOne({username}).exec()
    }

    async getAllUsers() : Promise<Array<User>> {
        return await this.model.find().exec()
    }

    async getUserById( id: number): Promise<User> {
        const user = await this.model.findById(id).exec()
        if (user){
            return user
        }
        throw new HttpException('User with this ID does not exist', HttpStatus.NOT_FOUND)
    }

    async deleteUserById( id: string): Promise<User> {
        return await this.model.findByIdAndDelete(id)
    }
}
