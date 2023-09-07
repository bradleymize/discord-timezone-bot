import { SlashCommandBuilder, SlashCommandStringOption, SlashCommandBooleanOption } from "@discordjs/builders";
import {CommandInteraction, CommandInteractionOptionResolver} from 'discord.js';
import {getLogger} from '../../logger';
import {CustomCommand} from '../command.interface';
import {setTimeout} from 'node:timers/promises'
import moment, {Moment} from "moment-timezone";

const winston = getLogger("convert.command.ts");

export class ConvertCommand extends SlashCommandBuilder implements CustomCommand {
  name = "convert"
  description = "Convert a GMT/UTC time to local"
  dm_permission = false

  constructor() {
    super();
    winston.info("Instantiating convert command");
    this.addStringOption((option: SlashCommandStringOption): SlashCommandStringOption => {
      option
          .setName("time")
          .setDescription("GMT/UTC time to convert in MM/DD/YYYY H:MM AM/PM")
          .setRequired(true);
      return option;
    });
    this.addStringOption((option: SlashCommandStringOption): SlashCommandStringOption => {
      option
          .setName("local_timezone")
          .setDescription("Your local timezone")
          .setRequired(true);
      return option;
    });
    winston.info("    Convert command instantiated");
  }

  async execute(interaction: any) {
    // console.log(interaction); // Uncomment for more detailed information about the interaction
    await interaction.deferReply({ephemeral: true});
    const localTimeZone: string = interaction?.options?.getString("local_timezone") as string;
    const timeString: string = interaction?.options?.getString("time") as string;
    const time: Moment = moment.tz(timeString, "GMT");
    await interaction.editReply(`Converting ${time.format("L LT")} from UTC/GMT to ${localTimeZone}: ${time.clone().tz(localTimeZone).format("L LT")}`);
  }
}

export default ConvertCommand;