import { APIResponse, request, test } from "@playwright/test";
import { IRequestOptions, IResponse, IResponseFields } from "../../data/types/api.types";
import { apiConfig } from "../../config/apiConfig";
import _ from "lodash";

export class RequestApi {
  private response: APIResponse;
  private testInfo = test.info;

  async send<T extends IResponseFields>(options: IRequestOptions): Promise<IResponse<T>> {
    try {
      const requestContext = await request.newContext({
        baseURL: options.baseURL ?? apiConfig.baseUrl,
      });

      this.attachRequest(options);

      this.response = await requestContext.fetch(options.url, _.omit(options, ["baseURL", "url"]));
      if (this.response.status() >= 500) throw new Error("Request failed with status " + this.response.status());
      const result = await this.transformResponse();
      this.attachResponse(options, result);
      return result;
    } catch (e: unknown) {
      throw e;
    }
  }

  async transformResponse() {
    const contentType = this.response.headers()["content-type"] || "";

    let body;
    if (contentType.includes("application/json")) {
      body = await this.response.json();
    } else {
      body = await this.response.text();
    }

    return {
      status: this.response.status(),
      body,
      headers: this.response.headers(),
    };
  }

  private attachRequest(options: IRequestOptions): void {
    this.testInfo().attach(`Request ${options.method.toUpperCase()} ${options.url}`, {
      body: JSON.stringify(
        {
          headers: options.headers,
          body: options.data,
        },
        null,
        2
      ),
      contentType: "application/json",
    });
  }

  private attachResponse<T extends IResponseFields>(options: IRequestOptions, response: IResponse<T>): void {
    this.testInfo().attach(`Response ${response.status} ${options.method.toUpperCase()} ${options.url}`, {
      body: JSON.stringify(
        {
          headers: response.headers,
          body: response.body,
        },
        null,
        2
      ),
      contentType: "application/json",
    });
  }
}
