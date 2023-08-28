import {Client} from 'discord.js';
import {Bot} from '../../Bot';
import {getLogger} from '../../logger';
import {EventHandlerInterface} from '../event.handler.interface';
import meta from '../../../package.json';

const winston = getLogger("Ready.handler.ts");

export class ReadyHandler implements EventHandlerInterface {
  enabled = true;

  constructor(client: Client) {
    client.on('ready', this.handle);
    winston.info("Loaded client ready handler.");
  }

  async handle(): Promise<any> {
    winston.info(`Bot started (v${meta.version})...`);
    Bot.client?.user?.setActivity(`v${meta.version}`, {type: "LISTENING"});
  }
}

export default ReadyHandler;