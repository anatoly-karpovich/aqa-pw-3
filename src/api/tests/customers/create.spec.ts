import { apiConfig } from "../../../config/apiConfig";
import { ADMIN_PASSWORD, ADMIN_USERNAME } from "../../../config/env";
import { generateNewCustomer } from "../../../data/customers/generateCustomer";
import _ from "lodash";
import { STATUS_CODES } from "../../../data/statusCodes";
import { test, expect } from "../../../fixtures/apiServices.fixture";

test.describe("[API] [Customers] [Create New Customer]", async function () {
  test.skip("Should create new customer with valid data", async ({ request }) => {
    const loginResponse = await request.post(apiConfig.baseUrl + apiConfig.endpoints.Login, {
      data: {
        username: ADMIN_USERNAME,
        password: ADMIN_PASSWORD,
      },
      headers: {
        "content-Type": "application/json",
      },
    });

    const token = loginResponse.headers()["authorization"];

    const customerData = generateNewCustomer();

    const createCustomerResponse = await request.post(apiConfig.baseUrl + apiConfig.endpoints.Customers, {
      data: customerData,
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const body = await createCustomerResponse.json();

    expect(createCustomerResponse.status()).toBe(STATUS_CODES.CREATED);
    expect(body.IsSuccess).toBe(true);
    expect(body.ErrorMessage).toBe(null);

    expect(body.Customer).toMatchObject({
      ...customerData,
    });

    const deleteResponse = await request.delete(
      apiConfig.baseUrl + apiConfig.endpoints["Get Customer By Id"](body.Customer._id),
      {
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    expect(deleteResponse.status()).toBe(STATUS_CODES.DELETED);
  });

  test.skip("Should create new customer with valid data and controllers", async function ({
    signInController,
    customersController,
  }) {
    const loginResponse = await signInController.login({
      username: ADMIN_USERNAME,
      password: ADMIN_PASSWORD,
    });

    const token = loginResponse.headers["authorization"];

    const customerData = generateNewCustomer();

    const createCustomerResponse = await customersController.create(customerData, `Bearer ${token}`);

    expect(createCustomerResponse.status).toBe(STATUS_CODES.CREATED);
    expect(createCustomerResponse.body.IsSuccess).toBe(true);
    expect(createCustomerResponse.body.ErrorMessage).toBe(null);

    expect(createCustomerResponse.body.Customer).toMatchObject({
      ...customerData,
    });

    const deleteResponse = await customersController.delete(
      createCustomerResponse.body.Customer._id,
      `Bearer ${token}`
    );
    expect(deleteResponse.status).toBe(STATUS_CODES.DELETED);
  });

  test("Should create new customer with valid data and services", async function ({
    signInApiService,
    customersController,
    customersApiService,
  }) {
    const token = await signInApiService.loginAsAdmin();

    const customerData = generateNewCustomer();

    const createCustomerResponse = await customersController.create(customerData, token);

    expect(createCustomerResponse.status).toBe(STATUS_CODES.CREATED);
    expect(createCustomerResponse.body.IsSuccess).toBe(true);
    expect(createCustomerResponse.body.ErrorMessage).toBe(null);

    expect(createCustomerResponse.body.Customer).toMatchObject({
      ...customerData,
    });

    await customersApiService.delete(createCustomerResponse.body.Customer._id);
  });
});
