export const cartSchema = {
  type: "object",
  properties: {
    id: { type: "number" },

    products: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "number" },
          title: { type: "string" },
          price: { type: "number" },
          quantity: { type: "number" },
          total: { type: "number" },
          discountPercentage: { type: "number" },
          discountedTotal: { type: "number" },
          thumbnail: { type: "string" },
        },
        required: [
          "id",
          "title",
          "price",
          "quantity",
          "total",
          "discountPercentage",
          "discountedTotal",
          "thumbnail",
        ],
      },
    },

    total: { type: "number" },
    discountedTotal: { type: "number" },
    userId: { type: "number" },
    totalProducts: { type: "number" },
    totalQuantity: { type: "number" },
  },
  required: [
    "id",
    "products",
    "total",
    "discountedTotal",
    "userId",
    "totalProducts",
    "totalQuantity",
  ],
};