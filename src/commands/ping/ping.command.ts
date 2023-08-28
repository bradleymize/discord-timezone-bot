import { SlashCommandBuilder } from "@discordjs/builders";
import {CommandInteraction} from 'discord.js';
import {getLogger} from '../../logger';
import {CustomCommand} from '../command.interface';
import {setTimeout} from 'node:timers/promises'

const winston = getLogger("ping.command.ts");

export class PingCommand extends SlashCommandBuilder implements CustomCommand {
  name = "ping"
  description = "Replies with Pong!"
  dm_permission = false

  constructor() {
    super();
    winston.info("Instantiating ping command");
  }

  async execute(interaction: CommandInteraction) {
    // console.log(interaction); // Uncomment for more detailed information about the interaction
    await interaction.deferReply();
    await setTimeout(2000);
    await interaction.editReply('Pong!');
  }
}

export default PingCommand;