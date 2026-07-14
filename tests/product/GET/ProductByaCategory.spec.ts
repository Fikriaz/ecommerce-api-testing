import { test, expect } from "@playwright/test";
import Ajv from "ajv";
import { singleCategory } from "../../schemas/singleCategory";
import * as fs from "fs";
const ajv = new Ajv();
const apiUrl = process.env.apiUrl as string;
const { accessToken } = JSON.parse(fs.readFileSync("tokens.json", "utf-8"));

test.describe("GET/ Product by a category", () => {
  test("GET / Produck by a Category", async ( {request }) => {
    const response = await request.get(apiUrl + '/products/category/smartphones',
    {
    headers: {
    Authorization: `Bearer ${accessToken}`,
    }
    });
    
    const validate = ajv.compile(singleCategory);
    const body = await response.json();
    expect(response.status()).toBe(200);
    console.log(body);
    const valid = validate(body)

    //cek valid
    if(!valid){
        console.log(validate.errors);
    }
    expect(valid).toBe(true)

    });
  });