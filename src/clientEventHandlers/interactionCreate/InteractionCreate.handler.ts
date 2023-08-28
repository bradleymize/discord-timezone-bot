import {Client} from 'discord.js';
import {Bot} from '../../Bot';
import {CustomCommand} from '../../commands/command.interface';
import {getLogger} from '../../logger';
import {EventHandlerInterface} from '../event.handler.interface';

const winston = getLogger("InteractionCreate.handler.ts");

export class InteractionCreateHandler implements EventHandlerInterface {
  enabled = true;

  constructor(client: Client) {
    client.on('interactionCreate', this.handle);
    winston.info("Loaded client interactionCreate handler.");
  }

  async handle(interaction: any): Promise<any> {
    winston.info(`Handling interactionCreate for command: ${interaction?.commandName}`);
    if(!interaction?.isCommand()) return;

    // noinspection TypeScriptValidateTypes - For some reason, it doesn't like Map types
    const command: CustomCommand = Bot?.client?.commands?.get(interaction?.commandName);
    if(!command) return;

    try {
      await command.execute(interaction);
    } catch(error) {
      winston.error(error);
      await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
    }
  }
}

export default InteractionCreateHandler;