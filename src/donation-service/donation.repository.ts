import { Injectable } from '@nestjs/common';

@Injectable()
export class DonationRepository {
  async getCountOfDonation(userId) {
    //fetches db and returns count of donations
    return 3;
  }
}
