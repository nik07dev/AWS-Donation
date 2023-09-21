import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Response } from 'express';
import * as AWS from 'aws-sdk';
import { DonationRepository } from './donation.repository';

@Injectable()
export class DonationService {
  private readonly logger: Logger = new Logger(DonationService.name);

  private readonly sns: AWS.SNS;
  constructor(private readonly donationRepository: DonationRepository) {
    this.sns = new AWS.SNS({
      region: process.env.REGION,
      credentials: {
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        accessKeyId: process.env.AWS_ACCESS_ID,
      },
    });
  }

  async getDonationAndSendMessage(
    userId: number,
    response: Response,
  ): Promise<Response> {
    try {
      const countOfDonationsByUser =
        await this.donationRepository.getCountOfDonation(userId);

      if (countOfDonationsByUser < 2) {
        return response
          .status(HttpStatus.ACCEPTED)
          .send({ message: 'Acknowledged and No Message Sent' });
      }
      const params: AWS.SNS.PublishInput = {
        TopicArn: process.env.SNS_DONATION_MESSAGE_TOPIC,
        Message: 'Thanks for your donation!!',
      };

      await this.sns.publish(params).promise();
      return response
        .status(HttpStatus.ACCEPTED)
        .send({ message: 'Request Acknowlegded and Message Sent' });
    } catch (error) {
      this.logger.error(error);
      return response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: 'INTERNAL SERVER ERROR' });
    }
  }
}
