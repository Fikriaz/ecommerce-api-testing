import { test, expect } from "@playwright/test";
import Ajv from "ajv";
import { productSchema } from "../schemas/productSchema";
import * as fs from "fs";

const ajv = new Ajv();
const apiUrl = process.env.apiUrl as string;
const { accessToken } = JSON.parse(fs.readFileSync("tokens.json", "utf-8"));

test("GET / AllProduct", async ( {request }) => {
    const response = await request.get(apiUrl + '/products',
    {
    headers: {
    Authorization: `Bearer ${accessToken}`,
    },
    params: {
    limit : 10,
    skip : 10,
    select : "title,price"
    }
    });

    const body = await response.json();
    expect(response.status()).toBe(200);

    //pagination
    expect(body.limit).toBe(10);
    expect(body.skip).toBe(10);
    expect(body.products.length).toBe(10);
    expect(body.total).toBeGreaterThan(0);
    body.products.forEach((products: any) => {
    expect(products.title).toBeDefined();
    expect(products.price).toBeDefined();
  });
});