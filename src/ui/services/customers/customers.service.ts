import _ from "lodash";
import { AddNewCustomerPage } from "../../pages/customers/addNewCustomer.page.js";
import { CustomersListPage } from "../../pages/customers/customers.page.js";
import { expect, Page } from "@playwright/test";
import { NOTIFICATIONS } from "../../../data/notifications.js";
import { SalesPortalPageService } from "../salesPortal.service.js";
import { logStep } from "../../../utils/reporter/logStep.js";

export class CustomersListPageService extends SalesPortalPageService {
  private customersPage: CustomersListPage;
  private addNewCustomerPage: AddNewCustomerPage;
  constructor(protected page: Page) {
    super(page);
    this.customersPage = new CustomersListPage(page);
    this.addNewCustomerPage = new AddNewCustomerPage(page);
  }

  @logStep()
  async openAddNewCustomerPage() {
    await this.customersPage.clickOnAddNewCustomer();
    await this.customersPage.waitForSpinnerToHide();
    await this.addNewCustomerPage.waitForOpened();
  }

  @logStep()
  async validateCreateCustomerNotification() {
    const notificationText = await this.customersPage.getLastNotificationText();
    expect(notificationText).toBe(NOTIFICATIONS.CUSTOMER_CREATED);
  }
}
