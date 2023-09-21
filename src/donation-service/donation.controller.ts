import { Controller, Get, Param, Response } from '@nestjs/common';
import { DonationService } from './donation.service';

@Controller('donation')
export class DonationController {
  constructor(private readonly donationService: DonationService) {}

  @Get('/getDonation/:userId')
  async getDonationAndSendMessage(
    @Param('userId') userId: number,
    @Response() response,
  ) {
    return this.donationService.getDonationAndSendMessage(userId, response);
  }
}
