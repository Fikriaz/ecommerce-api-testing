import { test, expect } from "@playwright/test"
import * as fs from "fs";

const apiUrl = process.env.apiUrl as string;
const { accessToken } = JSON.parse(fs.readFileSync("tokens.json", "utf-8"));

test("Post / Add carts ", async ( {request}) => {
    const response = await request.post(apiUrl + "/carts/add",
        {
            headers : {
                Authorization: `Bearer ${accessToken}`
            },
            data : {
                userId: 1,
                    products: [
                    {
                        id: 144,
                        quantity: 4
                    },
                {
                        id: 98,
                        quantity: 1
                }
                    ]
            }
        }
    )
    
    const body = await response.json();
    expect(response.status()).toBe(201);

    
});