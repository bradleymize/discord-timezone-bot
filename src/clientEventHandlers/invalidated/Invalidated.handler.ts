import {Client} from 'discord.js';
import {getLogger} from '../../logger';
import {EventHandlerInterface} from '../event.handler.interface';

export class InvalidatedHandler implements EventHandlerInterface {
  enabled = true;
  logger;

  constructor(client: Client) {
    client.on('invalidated', this.handle);
    this.logger = getLogger("Invalidated.handler.ts");
    this.logger.info("Loaded client invalidated handler.");
  }

  handle = async (): Promise<any> => {

  }
}

export default InvalidatedHandler;