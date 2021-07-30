import { slackCommands } from "./constants"

export const parseCommand = (command: string) => {
  return slackCommands[command] ?? slackCommands.unknown
}
