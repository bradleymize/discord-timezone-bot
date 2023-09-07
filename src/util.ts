// import {Message} from "discord.js";
import {SlashCommandBuilder} from '@discordjs/builders';
import {promises as fsp} from "fs";
import {join, sep} from "path";
import {EventHandlerInterface} from './clientEventHandlers/event.handler.interface';
import {getLogger} from "./logger";

const winston = getLogger('util.ts');

// export const DEVELOPER_ID = "185542644850622464";
//
// export function isDeveloper(message: Message) {
//   return message.author.id === DEVELOPER_ID;
// }

export enum ActionableType {
  HANDLER = "handler",
  COMMAND = "command"
}

export async function getAllOfType(type: ActionableType, dir: string = "./src"): Promise<string[]> {
  let fileList: string[] = [];

  const files = await fsp.readdir(dir);
  for (const file of files) {
    const p = join(dir, file);
    if ((await fsp.stat(p)).isDirectory()) {
      fileList = [...fileList, ...(await getAllOfType(type, p))];
    } else {
      fileList.push(p);
    }
  }

  fileList = fileList.reduce((acc, f) => {
    if(f.endsWith(`.${type}.ts`)) {
      acc.push(f);
    }
    return acc;
  }, [] as string[]);

  return fileList;
}

export async function load(type: ActionableType, files: string[]): Promise<EventHandlerInterface[] | SlashCommandBuilder[]> {
  let commands = await Promise.all(files.map(async (file) => {
    winston.debug(`Found command: ${file}`);
    let newPath = file.split(sep).slice(1).join("/");
    winston.debug(`    Converted file path to: ${newPath}`);
    winston.debug(`    Importing: ./${newPath.substring(0,newPath.length-3)}`);
    let imported = await import(`./${newPath.substring(0,newPath.length-3)}`);
    return imported.default;
  }));

  switch (type) {
    case ActionableType.HANDLER:
      return commands as EventHandlerInterface[];
    case ActionableType.COMMAND:
      return commands as SlashCommandBuilder[];
  }
}