import { expect, Page } from "@playwright/test";
import { generateNewCustomer } from "../../../data/customers/generateCustomer.js";
import { ICustomer, ICustomerResponse } from "../../../data/types/customers.types.js";
import { AddNewCustomerPage } from "../../pages/customers/addNewCustomer.page.js";
import { CustomersListPage } from "../../pages/customers/customers.page.js";
import { apiConfig } from "../../../config/apiConfig.js";
import { STATUS_CODES } from "../../../data/statusCodes.js";
import { logStep } from "../../../utils/reporter/logStep.js";

export class AddNewCustomerPageService {
  private customersPage: CustomersListPage;
  private addNewCustomerPage: AddNewCustomerPage;

  constructor(protected page: Page) {
    this.addNewCustomerPage = new AddNewCustomerPage(page);
    this.customersPage = new CustomersListPage(page);
  }

  @logStep()
  async fillCustomerInputs(customer: Partial<ICustomer>) {
    await this.addNewCustomerPage.fillInputs(customer);
  }

  @logStep()
  async save() {
    await this.addNewCustomerPage.clickOnSaveButton();
  }

  @logStep("Create new Customer on Add New Customer Page")
  async create(customer?: ICustomer) {
    const customerData = customer ?? generateNewCustomer();
    await this.fillCustomerInputs(customerData);
    const response = await this.addNewCustomerPage.interceprtResponse<ICustomerResponse>(
      apiConfig.baseUrl + apiConfig.endpoints.Customers,
      this.save.bind(this)
    );
    expect(response.status).toBe(STATUS_CODES.CREATED);
    expect(response.body.IsSuccess).toBe(true);
    expect(response.body.ErrorMessage).toBe(null);
    await this.addNewCustomerPage.waitForSpinnerToHide();
    await this.customersPage.waitForOpened();
    return response.body;
  }
}
