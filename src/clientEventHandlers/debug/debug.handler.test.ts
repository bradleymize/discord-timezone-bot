const mockDebug = jest.fn();
const transports = [{} as any]
jest.mock('../../logger', () => ({
    ...(jest.requireActual('../../logger')),
    getLogger: jest.fn().mockReturnValue({
        info: jest.fn(),
        debug: mockDebug,
        transports: transports
    })
}));

import {DebugHandler} from "./debug.handler";
import {LogLevel} from "../../logger";
import {Client} from "discord.js";

describe('debug.handler.ts', () => {
    describe('init', () => {
        it('should have debug enabled', () => {
            const cmd = new DebugHandler({
                on: jest.fn()
            } as unknown as Client);
            expect(transports[0].level).toEqual(LogLevel.DEBUG)
        });
    });

    describe('handle', () => {
        it('should log a debug message', async () => {
            const cmd = new DebugHandler({
                on: jest.fn()
            } as unknown as Client);

            await cmd.handle("Debug message");
            expect(mockDebug).toHaveBeenCalledWith("Debug message");
        });
    });
})
