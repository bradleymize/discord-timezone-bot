import {Client} from 'discord.js';
import {getLogger} from '../../logger';
import {EventHandlerInterface} from '../event.handler.interface';

export class InvalidRequestWarningHandler implements EventHandlerInterface {
  enabled = true;
  logger;

  constructor(client: Client) {
    client.on('invalidRequestWarning', this.handle);
    this.logger = getLogger("InvalidRequestWarning.handler.ts");
    this.logger.info("Loaded client invalidRequestWarning handler.");
  }

  handle = async (message: any): Promise<any> => {
    this.logger.warn(JSON.stringify(message, null, 2));
  }
}

export default InvalidRequestWarningHandler;