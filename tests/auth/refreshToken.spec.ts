import { test, expect } from "@playwright/test";
import * as dotenv from "dotenv";
dotenv.config();
const apiUrl = process.env.apiUrl as String;
test("POST /login", async ({ request }) => {
  const response = await request.post(apiUrl + "/auth/refresh", {
    data : {
        username: "emilys",
        password: "emilyspass",
    }
  });
  const body = await response.json();


  //Acces Token
  const accessToken = body.accessToken;
  expect(accessToken.data).not.toBeNull();

  //Refresh Token
  const refreshToken = body.refreshToken;
  expect(refreshToken.data).not.toBeNull();
});

