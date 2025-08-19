import { faker } from '@faker-js/faker';

// Platforms
const platforms = ['Physical Store', 'Shopee', 'Lazada', 'TikTok Shop'];

// Users
export const mockUsers = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: faker.person.fullName(),
  email: faker.internet.email(),
  role: faker.helpers.arrayElement(['Admin', 'Staff']),
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

// Brands & Categories
export const brands = ['Acme', 'Globex', 'Soylent', 'Initech', 'Umbrella', 'Stark', 'Wayne'];
export const categories = ['Shoes', 'Clothing', 'Food', 'Home', 'Sports', 'Merch', 'Books'];

// Products with multi-platform stock
export const products = Array.from({ length: 50 }, (_, i) => {
  const brand = faker.helpers.arrayElement(brands);
  const category = faker.helpers.arrayElement(categories);
  const sku = faker.string.alphanumeric({ length: 8 }).toUpperCase();
  
  // Generate stock per platform
  const stockPerPlatform = {
    'Physical Store': faker.number.int({ min: 0, max: 200 }),
    'Shopee': faker.number.int({ min: 0, max: 100 }),
    'Lazada': faker.number.int({ min: 0, max: 100 }),
    'TikTok Shop': faker.number.int({ min: 0, max: 100 }),
  };

  const totalStock = Object.values(stockPerPlatform).reduce((sum, qty) => sum + qty, 0);
  const price = faker.number.float({ min: 50, max: 100, precision: 0.01 });

  return {
    id: i + 1,
    sku,
    name: `${brand} ${faker.commerce.productName()}`,
    brand,
    category,
    price,
    stockPerPlatform,
    totalStock,
    lastSynced: faker.date.recent({ days: 5 }).toISOString(),
    syncStatus: faker.helpers.arrayElement(['Up-to-date', 'Pending Sync', 'Error']),
  };
});

// Generate sales data based on products
const generateSalesData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map((month, i) => ({
    month,
    sales: products.reduce((sum, product) => {
      // More sales in recent months
      const multiplier = i >= 9 ? 1.5 : i >= 6 ? 1.2 : 1;
      return sum + (product.price * faker.number.int({ min: 0, max: 20 * multiplier }));
    }, 0),
    orders: faker.number.int({ min: 50, max: 200 }) * (i >= 9 ? 1.5 : 1),
  })).slice(-3); // Only last 3 months
};

export const salesData = generateSalesData();

// Generate weekly sales data
export const weeklySalesData = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => ({
  day,
  sales: products.reduce((sum, product) => {
    return sum + (product.price * faker.number.int({ min: 0, max: 10 }));
  }, 0),
  orders: faker.number.int({ min: 10, max: 50 }),
}));

// Dashboard metrics
export const totalProducts = products.length;
export const lowStocks = products.filter(p => p.totalStock < 10).length;
export const inventoryValue = products.reduce((sum, p) => sum + (p.totalStock * p.price), 0);
export const totalRevenue = salesData.reduce((sum, month) => sum + month.sales, 0);
export const totalOrders = salesData.reduce((sum, month) => sum + month.orders, 0);

// Sales distribution by platform
export const salesDistribution = [
  { 
    name: 'Physical Store', 
    value: products.reduce((sum, p) => sum + (p.price * p.stockPerPlatform['Physical Store'] * 0.1), 0) 
  },
  { 
    name: 'Shopee', 
    value: products.reduce((sum, p) => sum + (p.price * p.stockPerPlatform['Shopee'] * 0.2), 0) 
  },
  { 
    name: 'Lazada', 
    value: products.reduce((sum, p) => sum + (p.price * p.stockPerPlatform['Lazada'] * 0.15), 0) 
  },
  { 
    name: 'TikTok Shop', 
    value: products.reduce((sum, p) => sum + (p.price * p.stockPerPlatform['TikTok Shop'] * 0.1), 0) 
  }
];



// Calculate growth percentages
const currentMonthSales = salesData[salesData.length - 1].sales;
const prevMonthSales = salesData[salesData.length - 2].sales;
export const salesGrowth = ((currentMonthSales - prevMonthSales) / prevMonthSales * 100).toFixed(1);

export const mockNotifications = Array.from({ length: 12 }, (_, i) => {
  const orderId = 1200 + i;
  const sku = faker.string.alphanumeric({ length: 6 }).toUpperCase();
  const platform = faker.helpers.arrayElement(platforms);

  return {
    id: i + 1,
    title: faker.helpers.arrayElement([
      `Order #${orderId} has been placed on ${platform}.`,
      `Stock running low for SKU: ${sku} on ${platform}.`,
      `Order #${orderId} has been shipped via ${platform}.`,
      `Stock updated for SKU: ${sku} in ${platform}.`,
      `Order #${orderId} refunded (${platform}).`,
      `${platform} sync completed.`,
      `${platform} sync failed.`,
    ]),
    message: faker.lorem.sentence(),
    date: faker.date.recent({ days: 7 }).toISOString(),
    time: faker.helpers.arrayElement(["2h", "5h", "1d", "3h", "6h", "8h", "2d", "4d"]),
    read: false,
    userId: faker.helpers.arrayElement(mockUsers).id,
    avatar: faker.image.avatar(),
    link: faker.helpers.arrayElement([
      `/orders/${orderId}`,
      `/inventory/${sku}`,
      "/messages"
    ]),
    type: faker.helpers.arrayElement(['order', 'inventory', 'sync', 'system']),
    platform
  };
});

export const getNotificationsForUser = (userId) =>
  mockNotifications.filter(n => n.userId === userId);

