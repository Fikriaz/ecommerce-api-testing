import { test, expect } from "@playwright/test";
import * as dotenv from "dotenv";
import * as fs from "fs";

dotenv.config();

const { accessToken } = JSON.parse(fs.readFileSync("tokens.json", "utf-8"));
const apiUrl = process.env.apiUrl as string;

test("POST /login", async ({ request }) => {
  const response = await request.post(apiUrl + "/auth/refresh", {
    data: {
      refreshToken: accessToken,
      expiresInMins: 30
    },
  });

  const body = await response.json();
  expect(response.status()).toBe(200);

  // Access Token
  const newAccessToken = body.accessToken;
  expect(newAccessToken).not.toBeNull();

  // Refresh Token
  const newRefreshToken = body.refreshToken;
  expect(newRefreshToken).not.toBeNull();
});