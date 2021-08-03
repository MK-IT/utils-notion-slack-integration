import { slackCommands } from './constants';

export const parseCommand = (command: string) => slackCommands[command] ?? slackCommands.unknown;
