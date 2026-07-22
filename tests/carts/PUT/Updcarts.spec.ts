import { test, expect } from "@playwright/test";
import * as fs from "fs";

const apiUrl = process.env.apiUrl as string;
const { accessToken } = JSON.parse(fs.readFileSync("tokens.json", "utf-8"));

test("UPD / carts" , async ({ request }) => {
    const response = await request.put(apiUrl + '/carts/1', 
    {
        headers: {
            Authorization: `Bearer ${accessToken}`,
    },
        data: {  
            merge: true,
            products: [
            {
                id: 1,
                quantity: 3
            }
            ]
        }
    });
    const body = await response.json();
    expect(response.status()).toBe(200);
    console.log(body);

    expect(body).not.toBeNull();
    expect(body.id).toBe(1)
    
    //assert update
    expect(body.products.id).toBe(1);
    expect(body.products.quantity).toBe(3);
});