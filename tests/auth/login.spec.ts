import { test, expect } from "@playwright/test";
import * as dotenv from "dotenv";
dotenv.config();
const apiUrl = process.env.apiUrl as String;
const user = process.env.user as string;
const pass = process.env.pass as string;
test("POST /login", async ({ request }) => {
  const response = await request.post(apiUrl + "/auth/login", {
    data : {
        username: user,
        password: pass,
    }
  });
  const body = await response.json();
  expect(response.status()).toBe(200);
  expect(typeof body.id).toBe('number');

  //Acces Token
  const accessToken = body.accessToken;
  expect(accessToken.data).not.toBeNull();

  //Refresh Token
  const refreshToken = body.refreshToken;
  expect(refreshToken.data).not.toBeNull();
});

