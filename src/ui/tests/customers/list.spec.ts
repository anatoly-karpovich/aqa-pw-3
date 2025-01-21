import { test } from "../../../fixtures/services.fixture";

test.describe("[UI] [Customers] [Edit Customer]", async function () {
  test("Should edit customer with valid data", async ({
    customersApiService,
    signInPageService,
    homePageService,
    customersPage,
  }) => {
    const createdCustomer = await customersApiService.create();
    await signInPageService.openSalesPortal();
    await homePageService.openCustomersPage();
    const customer = await customersPage.getCustomerFromTable(createdCustomer.email);
    console.log(customer);

    await customersApiService.delete(createdCustomer._id);
  });
});
