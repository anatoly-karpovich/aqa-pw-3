import { sendNotification } from "../utils/notifications/telegram";

export default async function () {
  if (!process.env.CI) return;

  await sendNotification(`Test run finished! Link to report:
    
    https://anatoly-karpovich.github.io/aqa-pw-3/allure-report/#
    `);
}
