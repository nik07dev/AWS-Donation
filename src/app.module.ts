import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DonationModule } from './donation-service/donation.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), DonationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
