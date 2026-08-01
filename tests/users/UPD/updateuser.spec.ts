import { test, expect } from "@playwright/test";
import Ajv from "ajv";
import { userSchema } from "../../schemas/userSchema";
import * as fs from "fs";
const ajv = new Ajv();
const apiUrl = process.env.apiUrl as string;
const { accessToken } = JSON.parse(fs.readFileSync("tokens.json", "utf-8"));

test.describe("GET/ User update", () => {

  test("GET / update single user", async ( {request }) => {
    const response = await request.put(apiUrl + '/users/2',
    {
    headers: {
    Authorization: `Bearer ${accessToken}`,
    },
    data: {

    lastName : "NATSU"
    
    }
    });
    const body = await response.json();
    expect(response.status()).toBe(200);
    expect(body.lastName).toBe("NATSU");

  });

});

