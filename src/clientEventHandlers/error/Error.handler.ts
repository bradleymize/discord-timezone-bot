import {Client} from 'discord.js';
import {getLogger} from '../../logger';
import {EventHandlerInterface} from '../event.handler.interface';
import { inspect } from 'util';

export class ErrorHandler implements EventHandlerInterface {
  enabled = true;
  logger;

  constructor(client: Client) {
    this.logger = getLogger("Error.handler.ts");
    client.on('error', this.handle);
    this.logger.info("Loaded client error handler.");
  }

  handle = async (message: any): Promise<any> => {
      this.logger.error(inspect(message));
  }
}

export default ErrorHandler;