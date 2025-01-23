import { apiConfig } from "../../config/apiConfig";
import { IRequestOptions } from "../../data/types/api.types";
import { ICustomer, ICustomerResponse } from "../../data/types/customers.types";
import { logStep } from "../../utils/reporter/logStep";
import { RequestApi } from "../apiClient/request";

export class CustomersController {
  constructor(private request = new RequestApi()) {}

  @logStep()
  async create(body: ICustomer, token: string) {
    const options: IRequestOptions = {
      url: apiConfig.endpoints.Customers,
      method: "post",
      data: body,
      headers: {
        "content-type": "application/json",
        Authorization: token,
      },
    };

    return await this.request.send<ICustomerResponse>(options);
  }

  @logStep()
  async delete(id: string, token: string) {
    const options: IRequestOptions = {
      url: apiConfig.endpoints["Get Customer By Id"](id),
      method: "delete",
      headers: {
        Authorization: token,
      },
    };

    return await this.request.send(options);
  }

  @logStep()
  async get(id: string, token: string) {
    const options: IRequestOptions = {
      url: apiConfig.endpoints["Get Customer By Id"](id),
      method: "get",
      headers: {
        "content-type": "application/json",
        Authorization: token,
      },
    };

    return await this.request.send<ICustomerResponse>(options);
  }
}
