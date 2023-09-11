import {Client} from 'discord.js';
import {getLogger} from '../../logger';
import {EventHandlerInterface} from '../event.handler.interface';

export class RateLimitHandler implements EventHandlerInterface {
  enabled = true;
  logger;

  constructor(client: Client) {
    client.on('rateLimit', this.handle);
    this.logger = getLogger("RateLimit.handler.ts");
    this.logger.info("Loaded client rateLimit handler.");
  }

  handle = async (message: any): Promise<any> => {
    this.logger.warn(JSON.stringify(message, null, 2));
  }
}

export default RateLimitHandler;