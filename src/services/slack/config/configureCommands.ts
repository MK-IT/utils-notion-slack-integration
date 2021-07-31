import { App } from '@slack/bolt';

import { parseCommand } from '../utils/commandParser';
import { executeCommand } from '../utils/commandExecutor';

export const configureCommands = async (client: App) => {
  client.command('/notion', async ({ ack, payload }) => {
    const { text } = payload;
    const command = parseCommand(text);
    await executeCommand(command, payload, client, ack);
  });
};
