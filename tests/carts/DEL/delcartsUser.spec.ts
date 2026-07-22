import { test, expect } from "@playwright/test";
import * as fs from "fs";

const apiUrl = process.env.apiUrl as string;
const { accessToken } = JSON.parse(fs.readFileSync("tokens.json", "utf-8"));

test("UPD / carts" , async ({ request }) => {
    const response = await request.delete(apiUrl + '/carts/1', 
    {
        headers: {
            Authorization: `Bearer ${accessToken}`,
    }
    });
    const body = await response.json();
    expect(response.status()).toBe(200);
    console.log(body);
    expect(body.id).toBe(1);
    expect(body).not.toBeDefined();
   
    expect(body.isDeleted).toBe(true);
});