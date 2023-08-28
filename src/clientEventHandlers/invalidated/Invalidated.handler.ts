import {Client} from 'discord.js';
import {getLogger} from '../../logger';
import {EventHandlerInterface} from '../event.handler.interface';

const winston = getLogger("Invalidated.handler.ts");

export class InvalidatedHandler implements EventHandlerInterface {
  enabled = true;

  constructor(client: Client) {
    client.on('invalidated', this.handle);
    winston.info("Loaded client invalidated handler.");
  }

  async handle(): Promise<any> {

  }
}

export default InvalidatedHandler;