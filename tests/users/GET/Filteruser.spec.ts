import { test, expect } from "@playwright/test";
import Ajv from "ajv";
import { userSchema } from "../../schemas/userSchema";
import * as fs from "fs";
const ajv = new Ajv();
const apiUrl = process.env.apiUrl as string;
const { accessToken } = JSON.parse(fs.readFileSync("tokens.json", "utf-8"));

 test("GET / Filter userr", async ( {request }) => {
    const response = await request.get(apiUrl + '/users/filter',
    {
    headers: {
    Authorization: `Bearer ${accessToken}`,
    },
    params: {
    key: "hair.color",
    value: "Brown" 
    }
    });

    const body = await response.json();
    expect(response.status()).toBe(200);
    console.log(body);
    expect(body.users).toBeDefined();
    expect(body.users.hair.color).toBe("Brown");
   
    }); 
