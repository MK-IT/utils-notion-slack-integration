import { App, LogLevel } from '@slack/bolt';

import { configureCommands } from './commander';
import { createTaskAction } from './actions';

const slack = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
  logLevel: LogLevel.DEBUG
});

export const start = async () => {
  createTaskAction(slack);
  await configureCommands(slack);
  slack.start(+process.env.APP_PORT);
};
