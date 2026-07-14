import { test, expect } from "@playwright/test";
import Ajv from "ajv";
import { productSchema } from "../../schemas/productSchema";
import * as fs from "fs";

const ajv = new Ajv();
const apiUrl = process.env.apiUrl as string;
const { accessToken } = JSON.parse(fs.readFileSync("tokens.json", "utf-8"));

test("GET / Single Products", async ( {request }) => {
    const response = await request.get(apiUrl + '/products/1',
    {
    headers: {
    Authorization: `Bearer ${accessToken}`,
    }
    });
    const body = await response.json();
    expect(response.status()).toBe(200);

    const validate = ajv.compile(productSchema);
    const valid = validate(body);

    if (!valid) {
        console.log(validate.errors);
    }
    expect(valid).toBe(true);
});