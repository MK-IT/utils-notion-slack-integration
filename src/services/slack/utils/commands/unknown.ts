import { triggerHelpCommand } from ".";

export const triggerUnknownCommand = () => {
  console.log('trigger unknown cmd...');
  triggerHelpCommand();
};
