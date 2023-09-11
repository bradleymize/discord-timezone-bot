import {ActivityType, Client} from 'discord.js';
import {Bot} from '../../Bot';
import {getLogger} from '../../logger';
import {EventHandlerInterface} from '../event.handler.interface';
import meta from '../../../package.json';

export class ReadyHandler implements EventHandlerInterface {
  enabled = true;
  logger;

  constructor(client: Client) {
    client.on('ready', this.handle);
    this.logger = getLogger("Ready.handler.ts");
    this.logger.info("Loaded client ready handler.");
  }

  handle = async (): Promise<any> => {
    this.logger.info(`Bot started (v${meta.version})...`);
    Bot.client?.user?.setActivity(`v${meta.version}`, {type: ActivityType.Listening});
  }
}

export default ReadyHandler;