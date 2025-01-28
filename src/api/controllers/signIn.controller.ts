import { apiConfig } from "../../config/apiConfig";
import { IRequestOptions } from "../../data/types/api.types";
import { ILoginResponse, IUserCredentials } from "../../data/types/user.types";
import { logStep } from "../../utils/reporter/logStep";
import { RequestApi } from "../apiClient/request";

export class SignInController {
  constructor(private request = new RequestApi()) {}

  @logStep()
  async login(credentials: IUserCredentials) {
    const options: IRequestOptions = {
      method: "post",
      url: apiConfig.endpoints.Login,
      data: credentials,
      headers: { "content-type": "application/json" },
    };

    return this.request.send<ILoginResponse>(options);
  }
}
