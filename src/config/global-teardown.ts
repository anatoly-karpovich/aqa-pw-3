import { QaseApi } from "qaseio";
import { sendNotification } from "../utils/notifications/telegram";

export default async function () {
  if (!process.env.CI) return;

  const qase = new QaseApi({ token: `${process.env.QASE_API_TOKEN}` });
  const run = await qase.runs.getRuns(`${process.env.QASE_PROJECT_ID}`, process.env.QASE_RUN_NAME);
  const id = run.data.result?.entities!.map((e) => e.id)![0];

  await sendNotification(`Test run finished! 

Link to Allure report:

https://anatoly-karpovich.github.io/aqa-pw-3/allure-report/#


Link to Qase report:

https://app.qase.io/run/${process.env.QASE_PROJECT_ID}/dashboard/${id}
    `);
}
