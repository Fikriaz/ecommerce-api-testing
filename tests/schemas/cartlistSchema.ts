// Schema untuk 1 item produk di dalam cart
const cartlistSchema = {
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
};

// Schema untuk 1 cart lengkap
const cartListSchema = {
  type: "object",
  properties: {
    id: { type: "number" },
    products: {
      type: "array",
      items: cartlistSchema,
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

// Schema untuk response GET /carts (list carts + pagination)
export const cartsListSchema = {
  type: "object",
  properties: {
    carts: {
      type: "array",
      items: cartlistSchema,
    },
    total: { type: "number" },
    skip: { type: "number" },
    limit: { type: "number" },
  },
  required: ["carts", "total", "skip", "limit"],
};