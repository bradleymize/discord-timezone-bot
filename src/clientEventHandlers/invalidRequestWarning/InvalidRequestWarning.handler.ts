import {Client} from 'discord.js';
import {getLogger} from '../../logger';
import {EventHandlerInterface} from '../event.handler.interface';

const winston = getLogger("InvalidRequestWarning.handler.ts");

export class InvalidRequestWarningHandler implements EventHandlerInterface {
  enabled = true;

  constructor(client: Client) {
    client.on('invalidRequestWarning', this.handle);
    winston.info("Loaded client invalidRequestWarning handler.");
  }

  async handle(message: any): Promise<any> {
    winston.warn(JSON.stringify(message, null, 2));
  }
}

export default InvalidRequestWarningHandler;