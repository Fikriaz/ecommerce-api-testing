import { test, expect } from "@playwright/test";
import Ajv from "ajv";
import { userSchema } from "../schemas/userSchema";
import * as fs from "fs";

const ajv = new Ajv();
const apiUrl = process.env.apiUrl as string;
const { accessToken } = JSON.parse(fs.readFileSync("tokens.json", "utf-8"));

test("GET / User", async ( {request }) => {
    const response = await request.get(apiUrl + '/auth/me',
    {
    headers: {
    Authorization: `Bearer ${accessToken}`,
    }
    });
    const body = await response.json();
    expect(response.status()).toBe(200);

    const validate = ajv.compile(userSchema);
    const valid = validate(body);

    if (!valid) {
        console.log(validate.errors);
    }
    expect(valid).toBe(true);
});