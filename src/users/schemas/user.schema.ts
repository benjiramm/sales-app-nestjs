import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type UserDocument = User & Document;

@Schema()
export class User  {
    @Prop({required:true})
    username: string;

    @Prop({required:true})
    password:string;

    @Prop({default: false})
    is_admin: boolean;

    _id: string;
}

export const UserSchema = SchemaFactory.createForClass(User);