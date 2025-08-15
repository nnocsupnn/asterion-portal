import { faker } from '@faker-js/faker';

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
export const categories = ['Electronics', 'Clothing', 'Food', 'Home', 'Sports', 'Toys', 'Books'];

// Products
export const products = Array.from({ length: 50 }, (_, i) => {
  const brand = faker.helpers.arrayElement(brands);
  const category = faker.helpers.arrayElement(categories);
  const sku = faker.string.alphanumeric({ length: 8 }).toUpperCase();
  const stock = faker.number.int({ min: 0, max: 200 });
  const price = faker.number.float({ min: 5, max: 500, precision: 0.01 });
  return {
    id: i + 1,
    sku,
    name: `${brand} ${faker.commerce.productName()}`,
    brand,
    category,
    stock,
    price,
  };
});

// Dashboard metrics
export const totalProducts = products.length;
export const lowStocks = products.filter(p => p.stock < 10);
export const inventoryValue = products.reduce((sum, p) => sum + p.stock * p.price, 0);

// Notifications
export const mockNotifications = Array.from({ length: 12 }, (_, i) => {
  const orderId = 1200 + i;
  const sku = faker.string.alphanumeric({ length: 6 }).toUpperCase();
  return {
    id: i + 1,
    title: faker.helpers.arrayElement([
      `Order #${orderId} has been placed.`,
      `Stock running low for SKU: ${sku}.`,
      `Order #${orderId} has been shipped.`,
      `Order #${orderId} is ready for pickup.`,
      `Stock updated for SKU: ${sku}.`,
      `Order #${orderId} refunded.`,
      `Order #${orderId} is delayed.`,
      `Low stock alert: ${sku}.`,
      `New message from supplier.`,
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
    type: faker.helpers.arrayElement(['order', 'inventory', 'system', 'message']),
  };
});

export const getNotificationsForUser = (userId) =>
  mockNotifications.filter(n => n.userId === userId);