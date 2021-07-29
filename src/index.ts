/* eslint-disable import/first */
import dotenv from 'dotenv';

dotenv.config(); // Note: import statements should come after `dotenv.config()`

// import * as Notion from './services/notion';

(async () => {
  // FIXME: comment out and `yarn start` to create a sample task in Notion
  // await Slack.start();
  // const values = await Notion.getValues();
  // console.log(values);
  // const user = await Notion.getUserByEmail('martin.angelov@mkit.io');
  // const tasks = await Notion.getIncompleteTasksByUserId(user);
  // const params: CreateTaskParams = {
  //   accountable: user,
  //   priority: '0bb46e0b-be4f-4b9c-87c2-b990868e9f92',
  //   reviewer: user,
  //   // sprints: [
  //   //   { id: "3df5aa7e-86a4-443f-9cec-51fe2fcd94f1" },
  //   //   { id: "8125aa6f-0ad6-4bc2-8765-7f17af97b831" },
  //   // ],
  //   sprint: '8125aa6f-0ad6-4bc2-8765-7f17af97b831',
  //   status: 'ab7c2b08-ed87-4c04-b30f-fa62440f75d5',
  //   estimate: 'a788b6b3-8b38-4e85-a142-c2e309d6dfdb',
  //   timeline: {
  //     start: '2021-04-26',
  //     end: '2021-04-28'
  //   },
  //   title: 'Auto created task',
  //   type: '3f806034-9c48-4519-871e-60c9c32d73d8'
  // };
  // const createdTask = await Notion.createTask(params);
})();
