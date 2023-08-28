import {Client} from 'discord.js';
import {getLogger} from '../../logger';
import {EventHandlerInterface} from '../event.handler.interface';

const winston = getLogger("Warn.handler.ts");

export class WarnHandler implements EventHandlerInterface {
  enabled = true;

  constructor(client: Client) {
    client.on('warn', this.handle);
    winston.info("Loaded client warn handler.");
  }

  async handle(message: string): Promise<any> {
    winston.warn(message);
  }
}

export default WarnHandler;