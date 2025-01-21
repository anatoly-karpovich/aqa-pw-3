import { test as base } from "./apiContollers.fixture";
import { CustomersApiService } from "../api/services/customersApi.service";
import { SignInApiService } from "../api/services/signInApi.service";
import { CustomersController } from "../api/controllers/customers.controller";

interface ISalesPortalApiServices {
  signInApiService: SignInApiService;
  customersApiService: CustomersApiService;
}

const signInApiService = new SignInApiService();

export const test = base.extend<ISalesPortalApiServices>({
  signInApiService: async ({}, use) => {
    await use(signInApiService);
  },

  customersApiService: async ({}, use) => {
    await use(new CustomersApiService(new CustomersController(), signInApiService));
  },
});

export { expect } from "@playwright/test";
