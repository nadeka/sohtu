export class Settings {
  static LANGUAGE: string = 'ENG';

  static API_BASE_URL(): string {
    if (process.env.NODE_ENV === 'production') {
      return 'http://marketingautomation-env.eu-west-1.elasticbeanstalk.com';
    } else {
      return 'http://localhost:8000';
    }
  }
}
