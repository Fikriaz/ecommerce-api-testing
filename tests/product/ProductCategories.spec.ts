import { test, expect } from "@playwright/test";
import Ajv from "ajv";
import { productSchema } from "../schemas/productSchema";
import * as fs from "fs";
const ajv = new Ajv();
const apiUrl = process.env.apiUrl as string;
const { accessToken } = JSON.parse(fs.readFileSync("tokens.json", "utf-8"));

test("GET / All Products By Categories", async ( {request }) => {
    const response = await request.get(apiUrl + '/products/categories',
    {
    headers: {
    Authorization: `Bearer ${accessToken}`,
    }
    });

    const body = await response.json();
    expect(response.status()).toBe(200);
    console.log(body);
    body.forEach((category: any) => {
    expect(typeof category.slug).toBe("string");
    expect(typeof category.name).not.toBeNull();
    expect(typeof category.url).toBe("string");

    expect(category.slug.length).toBeGreaterThan(0);
    expect(category.name.length).toBeGreaterThan(0);
    expect(category.url.length).toBeGreaterThan(0);
    
    });    
  
  });