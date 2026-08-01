import { test, expect } from "@playwright/test";
import Ajv from "ajv";
import { userSchema } from "../../schemas/userSchema";
import * as fs from "fs";
const ajv = new Ajv();
const apiUrl = process.env.apiUrl as string;
const { accessToken } = JSON.parse(fs.readFileSync("tokens.json", "utf-8"));

test.describe("GET/ User post", () => {

  test("GET / user post", async ( {request }) => {
    const response = await request.delete(apiUrl + '/users/1',
    {
    headers: {
    Authorization: `Bearer ${accessToken}`,
    }
    });
    const body = await response.json();
    expect(response.status()).toBe(200);
    expect(body.isDeleted).toBe("true");
    

  });

});

