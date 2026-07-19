import { test, expect } from '@playwright/test';
import * as fs from "fs";
import Ajv from "ajv";

const ajv = new Ajv();
const apiUrl = process.env.apiUrl as string;
const { accessToken } = JSON.parse(fs.readFileSync("tokens.json", "utf-8"));

test.describe(" Test Case Positive", () => {
    test("Get All Carts", async ( { request } ) => {
        const response = await request.get(apiUrl + '/carts', 
            {
            headers : {
                Authorization : `Bearer ${accessToken}`, 
            }
        });

        const body = await response.json();
        expect(response.status()).toBe(200);
        expect(body.carts).not.toBeNull();
        expect(body.carts).toBeDefined();
        
        expect(typeof body.id).toBe('number');
    });

});