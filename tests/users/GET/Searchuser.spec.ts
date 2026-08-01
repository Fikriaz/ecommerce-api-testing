import { test, expect } from "@playwright/test";
import Ajv from "ajv";
import { userSchema } from "../../schemas/userSchema";
import * as fs from "fs";
const ajv = new Ajv();
const apiUrl = process.env.apiUrl as string;
const { accessToken } = JSON.parse(fs.readFileSync("tokens.json", "utf-8"));


 test("GET / Search User", async ( {request }) => {
    const response = await request.get(apiUrl + '/users/search',
    {
    headers: {
    Authorization: `Bearer ${accessToken}`,
    },
    params: {
    q: "john",
    }
    });

    const body = await response.json();
    expect(response.status()).toBe(200);
    console.log(body);
    expect(body.users).toBeDefined();
    const keyword = 'john';

    for (const user of body.users) {
      const searchableText = [
        user.firstName,
        user.lastName,
        user.maidenName,
        user.username,
        user.email,
      ]
        .filter(Boolean) // buang kalau ada yang null/undefined
        .join(' ')
        .toLowerCase();

      expect(
        searchableText.includes(keyword),
        `User id ${user.id} - "${user.firstName} ${user.lastName}" tidak mengandung kata "john"`
      ).toBe(true);
    }
    }); 
