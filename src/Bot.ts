import {SlashCommandBuilder} from '@discordjs/builders';
import {REST} from '@discordjs/rest';
import {BotClient} from 'BotClient';
import {Routes} from 'discord-api-types/v9';
import {Client, Collection, Intents} from 'discord.js';
import minimist from 'minimist';
import {getLogger} from './logger';
import {ActionableType, getAllOfType, load} from "./util"

const winston = getLogger("Bot.ts");

export class Bot {
  static client: BotClient;

  public static async start() {
    if(!Bot.client) {
      const args = minimist(process.argv.slice(2));
      let botUserToken: string;
      const CLIENT_ID = <string>process.env.CLIENT_ID;
      const GUILD_ID = <string>process.env.GUILD_ID;
      let isDev = false;

      // Handling Dev / Prod setup
      if(args._.includes("--production")) {
        winston.info("Using production key");
        botUserToken = <string>process.env.PROD_BOT_TOKEN;
      } else {
        winston.info("Using dev key");
        isDev = true;
        botUserToken = <string>process.env.DEV_BOT_TOKEN;
      }
      if(!botUserToken || botUserToken === "") {
        winston.error("Error loading bot key");
        return;
      }
      if(isDev && (!GUILD_ID || GUILD_ID === "")) {
        winston.error("Error loading guild id for testing");
        return;
      }

      // Create the client
      const client: BotClient = new Client({ intents: [Intents.FLAGS.GUILDS] });

      // Build the commands
      client.commands = new Collection<any,any>();
      const COMMAND_FILES = await getAllOfType(ActionableType.COMMAND);
      const COMMANDS = await load(ActionableType.COMMAND, COMMAND_FILES);
      const commandPayload: any[] = [];
      COMMANDS.forEach(HandlerClass => {
        const cmd: SlashCommandBuilder = new (<any>HandlerClass)();
        // noinspection TypeScriptValidateTypes - For some reason, it doesn't like Map types
        client.commands?.set(cmd.name, cmd)
        commandPayload.push(cmd.toJSON());
      });

      // Build the event handlers
      const EVENT_HANDLERS_FILES = await getAllOfType(ActionableType.HANDLER);
      const EVENT_HANDLERS = await load(ActionableType.HANDLER, EVENT_HANDLERS_FILES);
      EVENT_HANDLERS.forEach(HandlerClass => {
        new (<any>HandlerClass)(client);
      });

      // Register the commands
      const rest = new REST({version: '9'}).setToken(botUserToken);
      try {
        winston.info('Started refreshing application (/) commands...');
        if(isDev) {
          winston.info(`    (Dev: Refreshing Guild-specific commands)`);
        }
        await rest.put(
          isDev ?
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID) :
            Routes.applicationCommands(CLIENT_ID),
          { body: commandPayload }
        );
        winston.info('Successfully reloaded application (/) commands...');
      } catch (error) {
        winston.error(error);
      }

      // Start the bot
      let response = await client.login(botUserToken);
      if (response === botUserToken) {
        winston.info("Successfully logged in");
      } else {
        winston.error("Error logging in:");
        winston.error(response);
      }

      // Save a reference to the bot for use elsewhere
      Bot.client = client;
    }
  }
}