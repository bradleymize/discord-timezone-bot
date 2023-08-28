import {Client, Collection} from 'discord.js';

export interface BotClient extends Client {
  commands?: Collection<any, any>
}