import { test, expect } from "@playwright/test";
import Ajv from "ajv";
import { productSchema } from "../schemas/productSchema";
import * as fs from "fs";

const ajv = new Ajv();
const apiUrl = process.env.apiUrl as string;
const { accessToken } = JSON.parse(fs.readFileSync("tokens.json", "utf-8"));

test("GET / SearchProduct", async ( {request }) => {
    const response = await request.get(apiUrl + '/products/search',
    {
    headers: {
    Authorization: `Bearer ${accessToken}`,
    },
    params: {
    sortBy: "title",
    order: "desc",
    limit: 3,
    }
    });

    const body = await response.json();
    expect(response.status()).toBe(200);
    console.log(body); 
    const titles = body.products.map((product: any) => product.title.toLowerCase());
    const sortedTitlesDesc = [...titles].sort().reverse(); 

    expect(titles).toEqual(sortedTitlesDesc);
});
