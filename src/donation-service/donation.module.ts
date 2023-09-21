import { Module } from '@nestjs/common';
import { DonationService } from './donation.service';
import { DonationController } from './donation.controller';
import { DonationRepository } from './donation.repository';

@Module({
  controllers: [DonationController],
  providers: [DonationService, DonationRepository],
})
export class DonationModule {}
