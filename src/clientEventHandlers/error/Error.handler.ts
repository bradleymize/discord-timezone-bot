import {Client} from 'discord.js';
import {getLogger} from '../../logger';
import {EventHandlerInterface} from '../event.handler.interface';

const winston = getLogger("Error.handler.ts");

export class ErrorHandler implements EventHandlerInterface {
  enabled = true;

  constructor(client: Client) {
    client.on('error', this.handle);
    winston.info("Loaded client error handler.");
  }

  async handle(message: any): Promise<any> {
    winston.error(JSON.stringify(message, null, 2));
  }
}

export default ErrorHandler;