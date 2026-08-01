import { test, expect } from "@playwright/test";
import Ajv from "ajv";
import { cartsUserSchema } from "../../schemas/cartsUserSchema";
import * as fs from "fs";
const ajv = new Ajv();
const apiUrl = process.env.apiUrl as string;
const { accessToken } = JSON.parse(fs.readFileSync("tokens.json", "utf-8"));

test.describe("GET/ User carts", () => {

  test("GET / Userts carts by user id", async ( {request }) => {
    const response = await request.get(apiUrl + '/users/1/carts',
    {
    headers: {
    Authorization: `Bearer ${accessToken}`,
    }
    });
    const body = await response.json();
    expect(response.status()).toBe(200);
    
    expect(body.total).toBe(1)
    expect(body.skip).toBe(0);
    expect(body.limit).toBe(1);


    const validate = ajv.compile(cartsUserSchema);
    const valid = validate(body);

    if (!valid) {
        console.log(validate.errors);
    }
    expect(valid).toBe(true);
    });

  });

  

