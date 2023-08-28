export interface EventHandlerInterface {
  enabled: boolean;
  handle: (message: any) => Promise<any>;
}