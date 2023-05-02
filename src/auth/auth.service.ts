import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { CreateUserDto } from 'src/users/dtos/users.create.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor( private readonly usersService: UsersService){}

    public async register(registrationData: CreateUserDto) {
        const hashedPassword = await hash(registrationData.password, 10) // encrypt password with 10 salt rounds
        try {
            const createdUser = await this.usersService.create({
                ...registrationData,
                password: hashedPassword
            });
            createdUser.password = undefined;
            return createdUser;
        }
        catch {
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public async getAuthenticatedUser(loginCredentials : CreateUserDto){
        try{
            // find the user that we want to reference
            const user = await this.usersService.getUserByUsername(loginCredentials.username)
            await this.verifyPassword(loginCredentials.password, user.password)
        
            user.password = undefined;
            return user;
        } catch (error) {
            throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST)
        }
    }

    private async verifyPassword(plainTextPassword :string, hashedPassword:string){
        const isPasswordMatching = await compare(plainTextPassword,hashedPassword);
        
        if (!isPasswordMatching) {
            throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST)
        }
    }
}
