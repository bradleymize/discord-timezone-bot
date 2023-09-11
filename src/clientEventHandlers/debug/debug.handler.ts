import {Client} from 'discord.js';
import {getLogger, LogLevel} from '../../logger';
import {EventHandlerInterface} from '../event.handler.interface';

export class DebugHandler implements EventHandlerInterface {
  enabled = true;
  logger;

  constructor(client: Client) {
    client.on('debug', this.handle);
    this.logger = getLogger("debug.handler.ts");
    this.logger.info(`Loaded client debug handler.`);
    if(this.enabled) {
      this.logger.transports[0].level = LogLevel.DEBUG;
    }
  }

  handle = async (message: string): Promise<any> => {
    this.logger.debug(message);
  }
}

export default DebugHandler;