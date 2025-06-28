import { Injectable } from '@nestjs/common';
import { helloWorld } from '@togethercrew/reputation-score';
@Injectable()
export class AppService {
  getHello(): string {
    console.log(helloWorld('NestJS'));
    return 'Hello World!';
  }
}
