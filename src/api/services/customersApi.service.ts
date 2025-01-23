import { expect } from "@playwright/test";
import { generateNewCustomer } from "../../data/customers/generateCustomer";
import { STATUS_CODES } from "../../data/statusCodes";
import { ICustomer } from "../../data/types/customers.types";
import { CustomersController } from "../controllers/customers.controller";
import { SignInApiService } from "./signInApi.service";
import { logStep } from "../../utils/reporter/logStep";

export class CustomersApiService {
  constructor(
    private customersController = new CustomersController(),
    private signInApiService = new SignInApiService()
  ) {}

  @logStep()
  async create(customerData?: Partial<ICustomer>) {
    const token = await this.signInApiService.getTransformedToken();

    const response = await this.customersController.create(generateNewCustomer(customerData), token);
    expect(response.status).toBe(STATUS_CODES.CREATED);
    expect(response.body.IsSuccess).toBe(true);
    expect(response.body.ErrorMessage).toBe(null);
    return response.body.Customer;
  }

  @logStep()
  async delete(id: string) {
    const token = await this.signInApiService.getTransformedToken();
    const response = await this.customersController.delete(id, token);
    expect(response.status).toBe(STATUS_CODES.DELETED);
  }

  @logStep()
  async get(id: string) {
    const token = await this.signInApiService.getTransformedToken();
    const response = await this.customersController.get(id, token);
    expect(response.status).toBe(STATUS_CODES.OK);
    return response.body.Customer;
  }
}
