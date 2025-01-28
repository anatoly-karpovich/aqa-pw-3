import { CustomersController } from "../api/controllers/customers.controller";
import { SignInController } from "../api/controllers/signIn.controller";
import { test as base } from "@playwright/test";

interface ISalesPortalApiControllers {
  signInController: SignInController;
  customersController: CustomersController;
}

export const test = base.extend<ISalesPortalApiControllers>({
  signInController: async ({}, use) => {
    await use(new SignInController());
  },

  customersController: async ({}, use) => {
    await use(new CustomersController());
  },
});

export { expect } from "@playwright/test";
