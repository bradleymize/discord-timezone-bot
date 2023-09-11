import {Logger} from "winston";

export interface EventHandlerInterface {
  enabled: boolean;
  handle: (message: any) => Promise<any>;
  logger: Logger;
}