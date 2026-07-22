import { test, expect } from '@playwright/test';
import * as fs from "fs";
import Ajv from "ajv";
import { cartSchema } from '../../schemas/cartSchemas';
import { cartsListSchema } from '../../schemas/cartlistSchema';

const ajv = new Ajv();
const apiUrl = process.env.apiUrl as string;
const { accessToken } = JSON.parse(fs.readFileSync("tokens.json", "utf-8"));

test.describe(" Test Case Positive", () => {
    test("Get Single Carts", async ( { request } ) => {
        const response = await request.get(apiUrl + '/carts/1', 
            {
            headers : {
                Authorization : `Bearer ${accessToken}`, 
            }
        });

        const validate = ajv.compile(cartSchema)
        const body = await response.json();
        expect(response.status()).toBe(200);
        console.log(body);
        const valid = validate(body)

        if(!valid){
            console.log(validate.errors);
        }
        expect(valid).toBe(true)
    });

     test("Get Carts by user", async ( { request } ) => {
        const response = await request.get(apiUrl + '/carts/user/1', 
            {
            headers : {
                Authorization : `Bearer ${accessToken}`, 
            }
        });

        const validate = ajv.compile(cartsListSchema)
        const body = await response.json();
        expect(response.status()).toBe(200);
        console.log(body);
        const valid = validate(body)

        if(!valid){
            console.log(validate.errors);
        }
        expect(valid).toBe(true)
    });

});