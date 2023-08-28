import {Client} from 'discord.js';
import {getLogger} from '../../logger';
import {EventHandlerInterface} from '../event.handler.interface';

const winston = getLogger("RateLimit.handler.ts");

export class RateLimitHandler implements EventHandlerInterface {
  enabled = true;

  constructor(client: Client) {
    client.on('rateLimit', this.handle);
    winston.info("Loaded client rateLimit handler.");
  }

  async handle(message: any): Promise<any> {
    winston.warn(JSON.stringify(message, null, 2));
  }
}

export default RateLimitHandler;