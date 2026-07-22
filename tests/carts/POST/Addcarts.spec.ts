import { test, expect } from "@playwright/test"
import * as fs from "fs";

const apiUrl = process.env.apiUrl as string;
const { accessToken } = JSON.parse(fs.readFileSync("tokens.json", "utf-8"));

test("Post / Add carts ", async ( {request}) => {
    const response = await request.post(apiUrl + "/carts/add",
        {
            headers : {
                Authorization: `Bearer ${accessToken}`
            },
            data : {
                userId: 1,
                    products: [
                    {
                        id: 144,
                        quantity: 4
                    },
                {
                        id: 98,
                        quantity: 1
                }
                    ]
            }
        }
    )
    
    const body = await response.json();
    expect(response.status()).toBe(201);

    expect(body.id).toBeDefined();
    expect(typeof body.userId).toBe("number");
    expect(body.userId).toBe(1);
    //cek produk input dua barang
    expect(body.products.length).toBe(2);

    // Pastikan quantity tiap produk sesuai yang dikirim
    const product1 = body.products.find((p: any) => p.id === 144);
    const product2 = body.products.find((p: any) => p.id === 98);

    expect(product1.quantity).toBe(4);
    expect(product2.quantity).toBe(1);

});