import { test, expect } from "@playwright/test";
import Ajv from "ajv";
import * as fs from "fs";

const apiUrl = process.env.apiUrl as string;
const { accessToken } = JSON.parse(fs.readFileSync("tokens.json", "utf-8"));

test("PUT / Update Product", async ( {request }) => {
    const response = await request.put(apiUrl + '/products/1',
    {
    headers: {
    Authorization: `Bearer ${accessToken}`,
    },
    data : {
    title : "iPhone Galaxy +1"
    }
    });
    const body = await response.json();
    expect(response.status()).toBe(200);
    expect(body.title).toBe("iPhone Galaxy +1");
    expect(typeof body.title).toBe("string");
    expect(typeof body.id).toBe("number");
    
});