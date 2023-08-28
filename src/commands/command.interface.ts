import {CommandInteraction} from 'discord.js';

export interface CustomCommand {
  execute: (interaction: CommandInteraction) => Promise<any>;
}