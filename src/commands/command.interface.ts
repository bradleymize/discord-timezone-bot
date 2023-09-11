import {CommandInteraction} from 'discord.js';
import {Logger} from "winston";

export interface CustomCommand {
  execute: (interaction: CommandInteraction) => Promise<any>;
  logger: Logger;
}