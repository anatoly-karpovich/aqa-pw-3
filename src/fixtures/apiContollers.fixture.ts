import { CustomersController } from "../api/controllers/customers.controller";
import { SignInController } from "../api/controllers/signIn.controller";
import { test as base, Page } from "@playwright/test";

interface ISalesPortalApiControllers {
  signInController: SignInController;
  customersController: CustomersController;
  page: Page;
}

export const test = base.extend<ISalesPortalApiControllers>({
  signInController: async ({}, use) => {
    await use(new SignInController());
  },

  customersController: async ({}, use) => {
    await use(new CustomersController());
  },

  page: async ({ page }, use) => {
    page.on("console", (message) => {
      if (message.text().includes("qase: Test run link:")) {
        console.log(message.text().split("[INFO] qase: Test run link:").at(-1));
      }
    });

    await use(page);
  },
});

export { expect } from "@playwright/test";
