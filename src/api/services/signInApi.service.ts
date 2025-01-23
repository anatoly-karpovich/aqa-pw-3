import { expect } from "@playwright/test";
import { SignInController } from "../controllers/signIn.controller";
import { ADMIN_USERNAME, ADMIN_PASSWORD } from "../../config/env";
import { STATUS_CODES } from "../../data/statusCodes";
import { logStep } from "../../utils/reporter/logStep";

export class SignInApiService {
  private token: string;

  constructor(private signInClient = new SignInController()) {}

  @logStep()
  async loginAsAdmin() {
    const response = await this.signInClient.login({ username: ADMIN_USERNAME, password: ADMIN_PASSWORD });
    expect(response.status).toBe(STATUS_CODES.OK);
    this.token = response.headers["authorization"];
    return this.getTransformedToken();
  }

  async getTransformedToken() {
    if (!this.token) {
      await this.loginAsAdmin();
    }
    return `Bearer ${this.token}`;
  }

  async getToken() {
    if (!this.token) {
      await this.loginAsAdmin();
    }
    return this.token;
  }
}
