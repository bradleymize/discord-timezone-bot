import { SlashCommandBuilder, SlashCommandStringOption } from "@discordjs/builders";
import {getLogger} from '../../logger';
import {CustomCommand} from '../command.interface';
import moment, {Moment} from "moment-timezone";

export class ConvertCommand extends SlashCommandBuilder implements CustomCommand {
  name = "convert"
  description = "Convert a GMT/UTC time to local"
  dm_permission = false
  logger;

  constructor() {
    super();
    this.logger = getLogger("convert.command.ts");
    this.logger.info("Instantiating convert command");
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
    this.logger.info("    Convert command instantiated");
  }

  execute = async (interaction: any) => {
    // console.log(interaction); // Uncomment for more detailed information about the interaction
    await interaction.deferReply({ephemeral: true});
    const localTimeZone: string = interaction?.options?.getString("local_timezone") as string;
    const timeString: string = interaction?.options?.getString("time") as string;
    const consoleWarn = console.warn;
    console.warn = () => {};
    const time: Moment = moment.tz(timeString, "GMT");
    console.warn = consoleWarn;
    await interaction.editReply(`Converting ${time.format("L LT")} from UTC/GMT to ${localTimeZone}: ${time.clone().tz(localTimeZone).format("L LT")}`);
  }
}

export default ConvertCommand;