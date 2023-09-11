import { ConvertCommand } from "./convert.command";
import {ApplicationCommandOptionType} from "discord-api-types/v10";
jest.mock('../../logger', () => ({
    getLogger: jest.fn().mockReturnValue({
        info: jest.fn()
    })
}));

describe('convert.commant.ts', () => {
    describe('init', () => {
        it('sets up the parameters', () => {
            const addStringOptionSpy:any = jest.spyOn(ConvertCommand.prototype, "addStringOption")
            const cmd = new ConvertCommand();
            const options = addStringOptionSpy.mock.results[0].value.options;

            expect(options[0].name).toEqual("time");
            expect(options[0].description).toEqual("GMT/UTC time to convert in MM/DD/YYYY H:MM AM/PM");
            expect(options[0].required).toEqual(true);
            expect(options[0].type).toEqual(ApplicationCommandOptionType.String);

            expect(options[1].name).toEqual("local_timezone");
            expect(options[1].description).toEqual("Your local timezone");
            expect(options[1].required).toEqual(true);
            expect(options[1].type).toEqual(ApplicationCommandOptionType.String);

            expect(cmd.logger.info).toHaveBeenCalledWith("Instantiating convert command");
        });
    });

    describe('execute', () => {
        it('should support MM/DD/YYYY H:MM AM/PM', async () => {
            const mockInteration = {
                deferReply: jest.fn(),
                options: {
                    getString: jest.fn()
                        .mockReturnValueOnce("America/Los_Angeles")
                        .mockReturnValueOnce("09/15/2023 5:12 PM")
                },
                editReply: jest.fn()
            };
            const cmd = new ConvertCommand();

            await cmd.execute(mockInteration);
            expect(mockInteration.deferReply).toHaveBeenCalledWith({ephemeral: true});
            expect(mockInteration.editReply).toHaveBeenCalledWith("Converting 09/15/2023 5:12 PM from UTC/GMT to America/Los_Angeles: 09/15/2023 10:12 AM");
        });
    });
})
