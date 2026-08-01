import { test, expect } from "@playwright/test";
import Ajv from "ajv";
import { userSchema } from "../../schemas/userSchema";
import * as fs from "fs";
const ajv = new Ajv();
const apiUrl = process.env.apiUrl as string;
const { accessToken } = JSON.parse(fs.readFileSync("tokens.json", "utf-8"));

test.describe("GET/ User post", () => {

  test("GET / user post", async ( {request }) => {
    const response = await request.post(apiUrl + '/users/add',
    {
    headers: {
    Authorization: `Bearer ${accessToken}`,
    },
    data: {
    firstName : "Muhammad",
    lastName : "Owi",
    age: 250
    
    }
    });
    const body = await response.json();
    expect(response.status()).toBe(201);

    expect(body.firstName).toBe("Muhammad");
    expect(body.lastName).toBe("Owi");
    expect(body.age).toBe(250);

  });

});

