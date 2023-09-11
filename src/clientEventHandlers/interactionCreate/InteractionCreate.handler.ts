import {Client} from 'discord.js';
import {Bot} from '../../Bot';
import {CustomCommand} from '../../commands/command.interface';
import {getLogger} from '../../logger';
import {EventHandlerInterface} from '../event.handler.interface';

export class InteractionCreateHandler implements EventHandlerInterface {
  enabled = true;
  logger;

  constructor(client: Client) {
    client.on('interactionCreate', this.handle);
    this.logger = getLogger("InteractionCreate.handler.ts");
    this.logger.info("Loaded client interactionCreate handler.");
  }

  handle = async (interaction: any): Promise<any> => {
    this.logger.info(`Handling interactionCreate for command: ${interaction?.commandName}`);
    if(!interaction?.isCommand()) return;

    // noinspection TypeScriptValidateTypes - For some reason, it doesn't like Map types
    const command: CustomCommand = Bot?.client?.commands?.get(interaction?.commandName);
    if(!command) return;

    try {
      await command.execute(interaction);
    } catch(error) {
      this.logger.error(error);
      await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
    }
  }
}

export default InteractionCreateHandler;