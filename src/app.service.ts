import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  
  getHello(): string {
    return `Welcome in Adventure's Journal Server`;
  }

  getHealth():string {
    return "Server Work!"
  }
}
