import { Injectable } from '@nestjs/common';

@Injectable()
export class DonationRepository {
  async getCountOfDonation(userId) {
    //fetches db and returns count of donations
    return { countOfDonationsByUser: 3, userPhoneNumber: '7020303202' };
  }
}
