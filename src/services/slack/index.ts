import { App, LogLevel } from "@slack/bolt";
import configureCommands from "./config/configureCommands";

const slack = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
  logLevel: LogLevel.DEBUG,
});

const start = async () => {
  await configureCommands(slack);
  slack.start(+process.env.APP_PORT);
};

export default start;
