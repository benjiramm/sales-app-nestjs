import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { StaffModule } from './staff/staff.module';
import { ItemsModule } from './items/items.module';
import { LogsModule } from './logs/logs.module';
import { LeaderboardModule } from './leaderboard/leaderboard.module';
import { ShiftsModule } from './shifts/shifts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGOURI),
    UsersModule,
    AuthModule,
    StaffModule,
    ItemsModule,
    LogsModule,
    LeaderboardModule,
    ShiftsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
