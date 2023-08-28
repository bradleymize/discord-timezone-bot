import * as winston from 'winston';

const MAX_MODULE_NAME_LENGTH = 25;
const MAX_LEVEL_LENGTH = 5;

const format = winston.format.combine(
  //adjust level before colorize
  winston.format((info) => {
    let levelPadding = '';
    let spacesToAdd = 0;
    if(MAX_LEVEL_LENGTH > info.level.length) {
      spacesToAdd = MAX_LEVEL_LENGTH - info.level.length + 1;
      levelPadding = Array(spacesToAdd).join(' ');
    }

    info.level = `${levelPadding}${info.level.toUpperCase()}`;
    return info;
  })(),
  winston.format.timestamp(),
  winston.format.splat(),
  winston.format.colorize(),
  winston.format.printf(({timestamp, module, level, message}) => {
    if(!module) {
      module = Array(MAX_MODULE_NAME_LENGTH + 1).join(' ');
    }
    return `[${timestamp}] ${module} - ${level}: ${message}`;
  })
);

winston.configure({
  transports: [new winston.transports.Console()],
  format: format
});

export enum LogLevel {
  ERROR = "error",
  WARN = "warn",
  INFO = "info",
  DEBUG = "debug",
}

export function getLogger(name: string, level:LogLevel = LogLevel.INFO) {
  let paddedName = name;
  if(MAX_MODULE_NAME_LENGTH > paddedName.length) {
    paddedName = Array(MAX_MODULE_NAME_LENGTH - paddedName.length + 1).join(' ') + paddedName
  }
  paddedName = paddedName.substring(0, MAX_MODULE_NAME_LENGTH);

  return winston.createLogger({
    defaultMeta: {module: paddedName},
    transports: [new winston.transports.Console({level})],
    format: format
  });
}