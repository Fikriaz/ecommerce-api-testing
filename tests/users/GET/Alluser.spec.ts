import { test, expect } from "@playwright/test";
import Ajv from "ajv";
import { categoriesSchema } from "../../schemas/categoriesSchema";
import * as fs from "fs";
const ajv = new Ajv();
const apiUrl = process.env.apiUrl as string;
const { accessToken } = JSON.parse(fs.readFileSync("tokens.json", "utf-8"));

test.describe("GET/ User", () => {

  test("GET / All User", async ( {request }) => {
    const response = await request.get(apiUrl + '/users',
    {
    headers: {
    Authorization: `Bearer ${accessToken}`,
    }
    });
    
    const body = await response.json();
    expect(response.status()).toBe(200);
    console.log(body);
    expect(typeof body.users.firstName).toBe('string')
    expect(typeof body.users.middleName).toBe('string')
    expect(typeof body.users.lastName).toBe('string')
    expect(typeof body.users.email).toBe('string')
    expect(body.users.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)

    });

test("GET / All User by Sort and limit", async ( {request }) => {
    const response = await request.get(apiUrl + '/products/categories',
    {
    headers: {
    Authorization: `Bearer ${accessToken}`,
    },
    data: {
    limit: 5,
    skip: 10,
    select: "firstName,age" 
    }
    });

    const body = await response.json();
    expect(response.status()).toBe(200);
    console.log(body);
    expect(body.users.id).toBeDefined();
    expect(body.users.firstName).toBeDefined();
    expect(body.users.age).toBeDefined();
    
    expect(body.skip).toBe(10);
    expect(body.limit).toBe(5);
   
    }); 
    
    test("GET / All User by first name and order", async ( {request }) => {
    const response = await request.get(apiUrl + '/users',
    {
    headers: {
    Authorization: `Bearer ${accessToken}`,
    },
    params: {
    sortBy: "firstName",
    order: "asc" 
    }
    });

    const body = await response.json();
    expect(response.status()).toBe(200);
    console.log(body);
    expect(body.users.id).toBeDefined();
    expect(body.users.firstName).toBeDefined();
    expect(body.users.age).toBeDefined();
    
    expect(body.skip).toBe(10);
    expect(body.limit).toBe(5);
   
    }); 

  });

  

