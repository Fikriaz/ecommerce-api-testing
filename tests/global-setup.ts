import { request } from "@playwright/test";
import * as dotenv from "dotenv";
import * as fs from "fs";

dotenv.config();

async function globalSetup() {
  const apiUrl = process.env.apiUrl as string;

  const requestContext = await request.newContext();

  const response = await requestContext.post(`${apiUrl}/auth/login`, {
    data: {
      username: "emilys",
      password: "emilyspass",
    },
  });

  const body = await response.json();

  const accessToken = body.accessToken;
  const refreshToken = body.refreshToken;

  // Simpan ke file JSON
  fs.writeFileSync(
    "tokens.json",
    JSON.stringify({ accessToken, refreshToken }, null, 2)
  );

  await requestContext.dispose();
}

export default globalSetup;