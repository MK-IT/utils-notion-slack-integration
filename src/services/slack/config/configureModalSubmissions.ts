import { App, ViewSubmitAction } from '@slack/bolt';

export const configureModalSubmissions = (client: App) => {
  client.view<ViewSubmitAction>({ callback_id: 'submit-form' }, async ({ ack, payload }) => {
    ack();
    // TODO: check if timeline start date is less than today and send error msg
    // TODO: check if timeline end date is less than start date and send error msg
    // Example error handling:
    // ack({
    //   response_action: 'errors',
    //   errors: {
    //     title: 'Please enter a title'
    //   }
    // });
    // IMPORTANT: Please note that the errors object property names should match the action_id from payload.state.values

    // TODO: map the payload to notion create task params

    // TODO: call Notion.CreateTask with the mapped params and post ephemeral message with the task
  });
};
