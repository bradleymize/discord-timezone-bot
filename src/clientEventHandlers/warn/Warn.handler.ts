import {Client} from 'discord.js';
import {getLogger} from '../../logger';
import {EventHandlerInterface} from '../event.handler.interface';

export class WarnHandler implements EventHandlerInterface {
  enabled = true;
  logger;

  constructor(client: Client) {
    client.on('warn', this.handle);
    this.logger = getLogger("Warn.handler.ts");
    this.logger.info("Loaded client warn handler.");
  }

  handle = async (message: string): Promise<any> => {
    this.logger.warn(message);
  }
}

export default WarnHandler;