import { test, expect } from "@playwright/test";
import Ajv from "ajv";
import * as fs from "fs";

const ajv = new Ajv();
const apiUrl = process.env.apiUrl as string;
const { accessToken } = JSON.parse(fs.readFileSync("tokens.json", "utf-8"));

test("POST / Add Products", async ( {request }) => {
    const response = await request.post(apiUrl + '/products/add',
    {
    headers : {
    Authorization: `Bearer ${accessToken}`,
    },
    data : {
        title: "BMW Pencil"
    }
    });
    const body = await response.json();
    expect(response.status()).toBe(201);
    console.log(body)
    expect(body.id).toBeGreaterThan(0);
    expect(typeof body.title).toBe("string");
    expect(typeof body.id).toBe("number");
    
});