import { faker } from "@faker-js/faker";
import { getRandromEnumValue } from "../../utils/enum/getRandomValue";
import { ICustomer } from "../types/customers.types";
import { COUNTRIES } from "./countries";

export const generateNewCustomer = (params?: Partial<ICustomer>) => {
  return {
    email: faker.internet.email(),
    name: `Name ${faker.string.alpha(35)}`,
    country: COUNTRIES[getRandromEnumValue(COUNTRIES)],
    city: `City ${faker.string.alpha(15)}`,
    street: `Street ${faker.string.alphanumeric(33)}`,
    house: faker.number.int(999),
    flat: faker.number.int(9999),
    phone: `+${faker.number.int(999999999999)}`,
    notes: `Notes ${faker.string.alpha(244)}`,
    ...params,
  } as ICustomer;
};
