import { test, expect } from "@playwright/test";
import Ajv from "ajv";
import * as fs from "fs";
const ajv = new Ajv();
const apiUrl = process.env.apiUrl as string;
const { accessToken } = JSON.parse(fs.readFileSync("tokens.json", "utf-8"));

test("DEL / Update Product", async ( {request }) => {
    const response = await request.delete(apiUrl + '/products/1',
    {
    headers: {
    Authorization: `Bearer ${accessToken}`,
    }
    });
    const body = await response.json();
    expect(body.isDeleted).toBe(true);
    expect(response.status()).toBe(200);
    
});