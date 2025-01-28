import { SALES_PORTAL_URL } from "../../../config/env";
import { test as setup } from "../../../fixtures/services.fixture";

const authFile = "src/.auth/user.json";

// setup("Login to Sales Portal", async ({ page, signInPageService }) => {
//   await signInPageService.openSalesPortal();
//   await signInPageService.loginAsAdmin();
//   await page.context().storageState({ path: authFile });
// });

setup("Login to Sales Portal via API", async ({ signInApiService, page }) => {
  await signInApiService.loginAsAdmin();
  await page.context().addCookies([
    {
      name: "Authorization",
      value: await signInApiService.getToken(),
      domain: "anatoly-karpovich.github.io",
      path: "/aqa-course-project",
      expires: -1,
      httpOnly: false,
      secure: false,
      sameSite: "Lax",
    },
  ]);
  await page.context().storageState({ path: authFile });
});
