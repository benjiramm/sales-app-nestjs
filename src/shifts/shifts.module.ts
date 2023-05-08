import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import { LogsModule } from 'src/logs/logs.module';
import { LogsService } from 'src/logs/logs.service';
import { Log, LogSchema } from 'src/logs/schemas/logs.schema';
import { ShiftsController } from './shifts.controller';
import { ShiftsService } from './shifts.service';

@Module({
  imports: [MongooseModule.forFeature([{name: Log.name, schema: LogSchema}])],
  controllers: [ShiftsController],
  providers: [ShiftsService]
})
export class ShiftsModule {}
