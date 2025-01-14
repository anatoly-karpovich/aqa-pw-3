import test, { expect } from "@playwright/test";
import { SignInPage } from "../../pages/signIn.page";
import { HomePage } from "../../pages/home.page";
import { CustomersListPage } from "../../pages/customers/customers.page";
import { AddNewCustomerPage } from "../../pages/customers/addNewCustomer.page";
import { ADMIN_PASSWORD, ADMIN_USERNAME } from "../../../config/env";
import { generateNewCustomer } from "../../../data/customers/generateCustomer";
import { NOTIFICATIONS } from "../../../data/notifications";

test.describe("[UI] [Customers] [Add New Customer]", async function () {
  test.skip("Should create new customer with valid data without POs", async ({ page }) => {
    await page.goto("https://anatoly-karpovich.github.io/aqa-course-project/");
    await page.getByPlaceholder("Enter a valid email address").fill("aqacourse@gmail.com");
    await page.getByPlaceholder("Enter password").fill("password");
    await page.getByText("Login", { exact: true }).click();
    await page.waitForTimeout(5000);
    await page.getByRole("listitem").filter({ hasText: "Customers" }).click();
    await page.locator(".spinner-border").waitFor({ state: "hidden" });
    await page.locator(".page-title-button").click();
    await page.locator("#inputName").fill("Test Customer");
    await page.locator("#inputEmail").fill("Test" + Date.now() + "@gmail.com");
    await page.locator("select#inputCountry").selectOption("France");
    await page.locator("#inputCity").fill("Leon");
    await page.locator("#inputStreet").fill("1st");
    await page.locator("#inputHouse").fill("5");
    await page.locator("#inputFlat").fill("11");
    await page.locator("#inputPhone").fill("+11111111111111111");
    await page.locator("#textareaNotes").fill("Text notes");
    await page.locator("#save-new-customer").click();
  });

  test("Should create new customer with valid data with POs", async ({ page }) => {
    const loginPage = new SignInPage(page);
    const homePage = new HomePage(page);
    const customersPage = new CustomersListPage(page);
    const addNewCustomerPage = new AddNewCustomerPage(page);

    await loginPage.openLoginPage();
    await loginPage.fillCredentialsInputs({
      username: ADMIN_USERNAME,
      password: ADMIN_PASSWORD,
    });
    await loginPage.clickSubmitButton();
    await homePage.waitForOpened();
    await homePage.clickOnViewDetailsButton("Customers");
    await customersPage.waitForOpened();
    await customersPage.clickOnAddNewCustomer();
    await addNewCustomerPage.fillInputs(generateNewCustomer());
    await addNewCustomerPage.clickOnSaveButton();
    await customersPage.waitForOpened();
    const notificationText = await customersPage.getFirstNotificationText();
    expect(notificationText).toBe(NOTIFICATIONS.CUSTOMER_CREATED);
  });
});
