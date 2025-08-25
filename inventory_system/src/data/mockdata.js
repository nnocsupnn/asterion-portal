// src/data/mockdata.js
import { faker } from "@faker-js/faker";

/* -------------------------
   1. USERS
-------------------------- */
export const mockUsers = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: faker.person.fullName(),
  email: faker.internet.email(),
  role: faker.helpers.arrayElement(["Admin", "Staff"]),
  avatar: faker.image.avatar(),
}));

mockUsers.push({
  id: 11,
  name: "Demo User",
  email: "demo@example.com",
  password: "password123",
  role: "Admin",
  avatar: faker.image.avatar(),
});

/* -------------------------
   2. PRODUCTS
-------------------------- */
export const products = Array.from({ length: 30 }, (_, i) => {
  const hasSale = faker.datatype.boolean({ probability: 0.3 });
  const discountPercent = hasSale ? faker.number.int({ min: 10, max: 50 }) : 0;

  const variants = Array.from({ length: faker.number.int({ min: 1, max: 4 }) }, (_, vi) => {
    const price = Number(faker.commerce.price({ min: 100, max: 3000 }));
    const costPrice = Number(faker.commerce.price({ min: 50, max: price }));
    const sellingPrice = hasSale 
      ? price * (1 - discountPercent / 100)
      : Number(faker.commerce.price({ min: price, max: price + 500 }));
    

    return {
      id: `${i + 1}-${vi + 1}`,
      name: `${faker.commerce.productMaterial()} Variant ${vi + 1}`,
      price,
      sellingPrice,
      stock: faker.number.int({ min: 0, max: 50 }),
      sku: `SKU-${i + 1}-${vi + 1}`,
      costPrice,
      onSale: hasSale,
      discountPercent: hasSale ? discountPercent : 0,
      minStock: faker.number.int({ min: 1, max: 5 }),
      weight: faker.number.float({ min: 0.1, max: 5, precision: 0.1 }),
    };
  });

  // aggregate fields for table
  const totalStock = variants.reduce((sum, v) => sum + v.stock, 0);
  const minStock = Math.min(...variants.map((v) => v.minStock));
  const basePrice = Math.min(...variants.map((v) => v.price));
  const baseCost = Math.min(...variants.map((v) => v.costPrice));

  let status = "In Stock";
  if (totalStock === 0) status = "Out of Stock";
  else if (totalStock <= minStock) status = "Low Stock";

  return {
    id: i + 1,
    name: faker.commerce.productName(),
    category: faker.commerce.department(),
    brand: faker.company.name(),
    image: faker.image.urlPicsumPhotos({ width: 200, height: 200 }),
    variants,
    onSale: hasSale,
    discountPercent,
    totalStock,
    minStock,
    basePrice,
    baseCost,
    status,
  };
});

/* -------------------------
   3. CATEGORIES
-------------------------- */
export const categories = [...new Set(products.map((p) => p.category))].map((name, index) => ({
  id: index + 1,
  name,
}));

/* -------------------------
   4. INVENTORY BY BRANDS
-------------------------- */
export const inventoryByBrand = [...new Set(products.map((p) => p.brand))].map((brand) => {
  const items = products.filter((p) => p.brand === brand);
  return {
    brand,
    value: items.reduce((sum, p) => sum + p.price * p.stock, 0),
  };
});

/* -------------------------
   5. ORDERS
-------------------------- */

// --- Generate Orders (daily for consistency) ---
const startOfYear = new Date("2025-01-01");
const endOfYear = new Date("2025-08-31");

// Generate 1–5 orders per day
export const orders = [];
let orderId = 1;
for (
  let d = new Date(startOfYear);
  d <= endOfYear;
  d.setDate(d.getDate() + 1)
) {
  const ordersToday = faker.number.int({ min: 1, max: 5 });
  for (let i = 0; i < ordersToday; i++) {
    const orderItems = Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => {
      const product = faker.helpers.arrayElement(products);
      const variant = faker.helpers.arrayElement(product.variants);
      const quantity = faker.number.int({ min: 1, max: 5 });
      return {
        productId: product.id,
        productName: product.name,
        variantId: variant.id,
        variantName: variant.name,
        quantity,
        price: variant.price,
        subtotal: variant.price * quantity,
        image: product.image,
      };
    });

    const total = orderItems.reduce((sum, item) => sum + item.subtotal, 0);

    orders.push({
      id: orderId++,
      customer: faker.person.fullName(),
      platform: faker.helpers.arrayElement(["Shopee", "Lazada", "TikTok Shop", "Physical Store"]),
      items: orderItems,
      total,
      status: faker.helpers.arrayElement(["Pending", "Delivered", "Cancelled", "Returned"]),
      date: new Date(d).toISOString(),
    });
  }
}

// ---  Daily Revenue (Revenue by Date) ---
export const revenueByDate = orders.reduce((acc, o) => {
  const dateKey = new Date(o.date).toLocaleDateString();
  acc[dateKey] = (acc[dateKey] || 0) + o.total;
  return acc;
}, {});

// --- Weekly Sales ---
const getStartOfWeek = (date) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday
  return new Date(d.setDate(diff));
};
const getEndOfWeek = (date) => {
  const start = getStartOfWeek(date);
  return new Date(start.getFullYear(), start.getMonth(), start.getDate() + 6, 23, 59, 59);
};

const startThisWeek = getStartOfWeek(new Date());
const endThisWeek = getEndOfWeek(new Date());
const startLastWeek = new Date(startThisWeek); startLastWeek.setDate(startLastWeek.getDate() - 7);
const endLastWeek = new Date(endThisWeek); endLastWeek.setDate(endLastWeek.getDate() - 7);

const calculateSales = (orders, start, end, platform = null) =>
  orders
    .filter((o) => {
      const orderDate = new Date(o.date);
      return orderDate >= start && orderDate <= end && (platform ? o.platform === platform : true);
    })
    .reduce((sum, o) => sum + o.total, 0);

export const weeklySalesTotal = {
  thisWeek: calculateSales(orders, startThisWeek, endThisWeek),
  lastWeek: calculateSales(orders, startLastWeek, endLastWeek),
};
weeklySalesTotal.growth =
  weeklySalesTotal.lastWeek === 0
    ? 100
    : ((weeklySalesTotal.thisWeek - weeklySalesTotal.lastWeek) / weeklySalesTotal.lastWeek) * 100;

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const weeklySales = days.map((day, i) => {
  const sales = orders
    .filter((o) => {
      const d = new Date(o.date);
      const dayIndex = d.getDay() === 0 ? 6 : d.getDay() - 1;
      return dayIndex === i && d >= startThisWeek && d <= endThisWeek;
    })
    .reduce((sum, o) => sum + o.total, 0);
  return { day, sales };
});

// --- Monthly Sales ---
const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
export const monthlySales = months.map((m, idx) => {
  const sales = orders
    .filter(o => new Date(o.date).getMonth() === idx)
    .reduce((sum, o) => sum + o.total, 0);
  return { month: m, sales };
});

// --- Sales by Platform ---
export const salesByPlatform = orders.reduce((acc, o) => {
  acc[o.platform] = (acc[o.platform] || 0) + o.total;
  return acc;
}, {});

/* -------------------------
   5. SALES GROWTH (chart data)
-------------------------- */
export const salesGrowth = Array.from({ length: 12 }, () => ({
  month: faker.date.month({ abbreviated: true }),
  sales: faker.number.int({ min: 700, max: 1000 }),
}));

/* -------------------------
   6. SUMMARY DATA (for dashboard cards)
-------------------------- */
export const summaryData = (() => {
  // Flatten all variants across products
  const allVariants = products.flatMap((p) =>
    p.variants.map((v) => ({ ...v, productId: p.id }))
  );

  return {
    totalProducts: products.length,
    totalVariants: allVariants.length,

    inStock: allVariants.filter((v) => v.stock > 0).length, 
    lowStocks: allVariants.filter((v) => v.stock > 0 && v.stock <= 5).length, // Changed to <= 5 for low stock
    outOfStock: allVariants.filter((v) => v.stock === 0).length, 

    inventoryValue: allVariants.reduce((sum, v) => sum + (v.price * v.stock), 0),

    totalOrders: orders.length,
    totalRevenue: orders.reduce((sum, o) => sum + o.total, 0),
    
    // Order status counts
    delivered: orders.filter(o => o.status === "Delivered").length,
    pending: orders.filter(o => o.status === "Pending").length,
    cancelled: orders.filter(o => o.status === "Cancelled").length,
    returned: orders.filter(o => o.status === "Returned").length,
  };
})();

/* -------------------------
   7. NOTIFICATIONS
-------------------------- */
export const notifications = [
  {
    id: 1,
    type: "order",
    message: `New order received from ${orders[0].customer} on ${orders[0].platform}.`,
    date: faker.date.recent(),
    read: false,
  },
  {
    id: 2,
    type: "stock",
    message: `Low stock alert: ${products[0].name} only has ${products[0].variants[0].stock} left.`,
    date: faker.date.recent(),
    read: false,
  },
  {
    id: 3,
    type: "order",
    message: `Order #${orders[3].id} has been returned`,
    date: faker.date.recent(),
    read: true,
  },
  {
    id: 4,
    type: "order",
    message: `Order #${orders[1].id} has been delivered.`,
    date: faker.date.recent(),
    read: false,
  },
  {
    id: 5,
    type: "order",
    message: `Order #${orders[2].id} was cancelled.`,
    date: faker.date.recent(),
    read: true,
  },
];