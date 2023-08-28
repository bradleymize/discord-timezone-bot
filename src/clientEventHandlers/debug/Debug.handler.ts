import {Client} from 'discord.js';
import {getLogger, LogLevel} from '../../logger';
import {EventHandlerInterface} from '../event.handler.interface';

const winston = getLogger("Debug.handler.ts");

export class DebugHandler implements EventHandlerInterface {
  enabled = true;

  constructor(client: Client) {
    client.on('debug', this.handle);
    winston.info(`Loaded client debug handler.`);
    if(this.enabled) {
      winston.transports[0].level = LogLevel.DEBUG;
    }
  }

  async handle(message: string): Promise<any> {
    winston.debug(message);
  }
}

export default DebugHandler;