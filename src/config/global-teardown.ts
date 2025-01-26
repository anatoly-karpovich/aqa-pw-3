import { QaseApi } from "qaseio";

export default async function () {
  const qase = new QaseApi({ token: `${process.env.QASE_API_TOKEN}` });
  const run = await qase.runs.getRuns(`${process.env.QASE_PROJECT_ID}`, process.env.QASE_RUN_NAME);
  const id = run.data.result?.entities!.map((e) => e.id)![0];

  console.log(`https://app.qase.io/run/${process.env.QASE_PROJECT_ID}/dashboard/${id}`);
}
