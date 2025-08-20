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

// Realistic brands by category
const brandCategories = {
  'Shoes': ['Nike', 'Adidas', 'Puma', 'New Balance', 'Reebok', 'Converse', 'Vans', 'Skechers'],
  'Clothing': ['Zara', 'H&M', 'Uniqlo', 'Levi\'s', 'Tommy Hilfiger', 'Calvin Klein', 'Lacoste', 'Ralph Lauren'],
  'Electronics': ['Samsung', 'Apple', 'Sony', 'LG', 'Xiaomi', 'Huawei', 'Google', 'Microsoft'],
  'Home': ['IKEA', 'Home Depot', 'Williams-Sonoma', 'Crate & Barrel', 'Wayfair', 'Pottery Barn'],
  'Sports': ['Under Armour', 'Decathlon', 'Wilson', 'Spalding', 'Yonex', 'Nike', 'Adidas'],
  'Accessories': ['Fossil', 'Casio', 'Timex', 'Ray-Ban', 'Oakley', 'Dyson'],
  'Books': ['Penguin', 'HarperCollins', 'Simon & Schuster', 'Macmillan', 'Scholastic']
};

// Realistic product names by category
const productNamesByCategory = {
  'Shoes': ['Running Shoes', 'Basketball Sneakers', 'Casual Loafers', 'Athletic Trainers', 'Hiking Boots', 'Sandals', 'Formal Oxfords'],
  'Clothing': ['Cotton T-Shirt', 'Denim Jeans', 'Hooded Sweatshirt', 'Winter Jacket', 'Dress Shirt', 'Sports Shorts', 'Winter Beanie'],
  'Electronics': ['Smartphone', 'Wireless Earbuds', 'Smart Watch', 'Tablet', 'Laptop', 'Headphones', 'Bluetooth Speaker'],
  'Home': ['Desk Lamp', 'Throw Pillow', 'Coffee Table', 'Dinnerware Set', 'Bed Sheets', 'Storage Box', 'Wall Clock'],
  'Sports': ['Basketball', 'Tennis Racket', 'Yoga Mat', 'Dumbbell Set', 'Football', 'Running Shorts', 'Golf Clubs'],
  'Accessories': ['Wrist Watch', 'Sunglasses', 'Backpack', 'Wallet', 'Necklace', 'Bracelet', 'Hat'],
  'Books': ['Bestselling Novel', 'Cookbook', 'Children\'s Book', 'Science Fiction', 'Self-Help Guide', 'Biography']
};

// Variation options by category
const variationOptions = {
  'Shoes': {
    sizes: ['US 6', 'US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12', 'US 13'],
    colors: ['Black', 'White', 'Gray', 'Navy', 'Red', 'Blue', 'Green', 'Brown'],
    width: ['Regular', 'Wide', 'Narrow'],
    material: ['Leather', 'Canvas', 'Mesh', 'Synthetic', 'Suede']
  },
  'Clothing': {
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
    colors: ['Black', 'White', 'Gray', 'Navy', 'Red', 'Blue', 'Green', 'Yellow', 'Pink', 'Purple'],
    fit: ['Slim', 'Regular', 'Relaxed', 'Oversized'],
    material: ['Cotton', 'Polyester', 'Wool', 'Denim', 'Linen', 'Blend']
  },
  'Electronics': {
    storage: ['64GB', '128GB', '256GB', '512GB', '1TB'],
    colors: ['Black', 'White', 'Silver', 'Space Gray', 'Midnight', 'Starlight', 'Blue', 'Red'],
    connectivity: ['Wi-Fi', 'Wi-Fi + Cellular', 'Bluetooth 5.0', 'Bluetooth 5.2']
  },
  'Home': {
    sizes: ['Small', 'Medium', 'Large', 'Extra Large'],
    colors: ['White', 'Black', 'Brown', 'Gray', 'Beige', 'Blue', 'Red'],
    material: ['Wood', 'Metal', 'Glass', 'Ceramic', 'Plastic', 'Fabric']
  },
  'Sports': {
    sizes: ['Youth', 'Small', 'Medium', 'Large', 'One Size'],
    colors: ['Orange', 'Yellow', 'Green', 'Blue', 'Red', 'Black', 'White'],
    material: ['Rubber', 'Leather', 'Nylon', 'Polyester', 'Composite']
  },
  'Accessories': {
    sizes: ['One Size', 'Small', 'Medium', 'Large'],
    colors: ['Silver', 'Gold', 'Rose Gold', 'Black', 'Brown', 'Multicolor'],
    material: ['Stainless Steel', 'Leather', 'Silicon', 'Titanium', 'Plastic']
  },
  'Books': {
    format: ['Paperback', 'Hardcover', 'eBook', 'Audiobook'],
    condition: ['New', 'Like New', 'Very Good', 'Good', 'Acceptable'],
    language: ['English', 'Filipino', 'Spanish', 'Japanese', 'Korean']
  }
};

// Image settings by category
const imageSettingsByCategory = {
  'Shoes': { width: 400, height: 300, category: 'shoes' },
  'Clothing': { width: 300, height: 400, category: 'fashion' },
  'Electronics': { width: 400, height: 300, category: 'technics' },
  'Home': { width: 400, height: 300, category: 'furniture' },
  'Sports': { width: 400, height: 300, category: 'sports' },
  'Accessories': { width: 300, height: 300, category: 'accessories' },
  'Books': { width: 300, height: 400, category: 'books' }
};

// Categories and status options
export const categories = Object.keys(brandCategories);
export const statusOptions = ['In Stock', 'Low Stock', 'Out of Stock', 'On Sale', 'Discontinued'];

// Function to generate product images
const generateProductImages = (category, count = 3) => {
  const settings = imageSettingsByCategory[category] || { width: 400, height: 300, category: 'product' };
  return Array.from({ length: count }, (_, i) => 
    faker.image.urlLoremFlickr({
      width: settings.width,
      height: settings.height,
      category: settings.category,
      randomize: true
    })
  );
};

// Function to generate variations for a product
const generateVariations = (category, basePrice, baseCost, baseImages) => {
  const options = variationOptions[category];
  const variations = [];
  
  // Generate 3-8 variations per product
  const variationCount = faker.number.int({ min: 3, max: 8 });
  
  for (let i = 0; i < variationCount; i++) {
    const variation = {
      id: faker.string.uuid(),
      sku: `${faker.string.alphanumeric(6).toUpperCase()}-V${i + 1}`,
      price: faker.number.float({ 
        min: basePrice * 0.8, 
        max: basePrice * 1.2, 
        precision: 0.01 
      }),
      cost: faker.number.float({ 
        min: baseCost * 0.9, 
        max: baseCost * 1.1, 
        precision: 0.01 
      }),
      attributes: {},
      images: []
    };
    
    // Add attributes based on category
    if (options.sizes) {
      variation.attributes.size = faker.helpers.arrayElement(options.sizes);
    }
    if (options.colors) {
      variation.attributes.color = faker.helpers.arrayElement(options.colors);
      // Generate variation-specific images based on color
      variation.images = [baseImages[0]]; // Use first base image for all variations
    }
    if (options.material && faker.datatype.boolean(0.6)) {
      variation.attributes.material = faker.helpers.arrayElement(options.material);
    }
    if (options.storage && faker.datatype.boolean(0.5)) {
      variation.attributes.storage = faker.helpers.arrayElement(options.storage);
    }
    if (options.fit && faker.datatype.boolean(0.4)) {
      variation.attributes.fit = faker.helpers.arrayElement(options.fit);
    }
    
    // If no color variation, use the first base image
    if (variation.images.length === 0) {
      variation.images = [baseImages[0]];
    }
    
    // Generate stock per platform for this variation
    variation.stockPerPlatform = {};
    platforms.forEach(platform => {
      const maxStock = platform === 'Physical Store' 
        ? faker.number.int({ min: 5, max: 50 })
        : faker.number.int({ min: 2, max: 25 });
      
      variation.stockPerPlatform[platform] = faker.number.int({ min: 0, max: maxStock });
    });
    
    variation.totalStock = Object.values(variation.stockPerPlatform).reduce((sum, qty) => sum + qty, 0);
    
    variations.push(variation);
  }
  
  return variations;
};

// Products with variations
export const products = Array.from({ length: 50 }, (_, i) => {
  const category = faker.helpers.arrayElement(categories);
  const brand = faker.helpers.arrayElement(brandCategories[category]);
  const productName = faker.helpers.arrayElement(productNamesByCategory[category]);
  
  // Base price and cost for this product
  const basePrice = faker.number.float({ min: 200, max: 5000, precision: 0.01 });
  const baseCost = basePrice * faker.number.float({ min: 0.4, max: 0.7, precision: 0.01 });
  
  // Generate product images
  const images = generateProductImages(category);
  
  // Generate variations
  const variations = generateVariations(category, basePrice, baseCost, images);
  
  // Calculate total stock across all variations
  const totalStock = variations.reduce((sum, variation) => sum + variation.totalStock, 0);
  const minStock = faker.number.int({ min: 10, max: 30 });
  
  // Determine status based on stock levels
  let status = "In Stock";
  if (totalStock === 0) {
    status = "Out of Stock";
  } else if (totalStock < minStock) {
    status = "Low Stock";
  } else if (faker.number.int({ min: 1, max: 100 }) <= 15) {
    status = "On Sale";
  } else if (faker.number.int({ min: 1, max: 100 }) <= 5) {
    status = "Discontinued";
  }
  
  // Realistic product notes
  const notesOptions = [
    "",
    "New arrival - limited stock",
    "Restocking next week",
    "Limited edition collection",
    "Best seller - reorder frequently",
    "Seasonal product",
    "Clearance item",
    "Exclusive online product",
    "Store display item",
    "Pre-order available"
  ];
  
  return {
    id: i + 1,
    sku: `${brand.substring(0, 3).toUpperCase()}${faker.string.numeric(5)}`,
    name: `${brand} ${productName}`,
    brand,
    category,
    basePrice: parseFloat(basePrice.toFixed(2)),
    baseCost: parseFloat(baseCost.toFixed(2)),
    images,
    variations,
    totalStock,
    minStock,
    status,
    discount: status === "On Sale" ? faker.helpers.arrayElement([10, 15, 20, 25, 30, 40, 50]) : null,
    notes: faker.helpers.arrayElement(notesOptions),
    description: faker.commerce.productDescription(),
    lastSynced: faker.date.recent({ days: 7 }).toISOString(),
    syncStatus: faker.helpers.arrayElement(['Up-to-date', 'Pending Sync', 'Error']),
    rating: faker.number.float({ min: 3, max: 5, precision: 0.1 }),
    reviewCount: faker.number.int({ min: 5, max: 200 }),
    weight: faker.number.float({ min: 0.1, max: 5, precision: 0.1 }),
    dimensions: `${faker.number.int({ min: 10, max: 50 })}x${faker.number.int({ min: 10, max: 50 })}x${faker.number.int({ min: 5, max: 30 })} cm`,
    tags: Array.from({ length: faker.number.int({ min: 1, max: 4 }) }, () => 
      faker.helpers.arrayElement(['popular', 'new', 'trending', 'eco-friendly', 'premium', 'budget'])
    ),
  };
});

// Generate sales data that accounts for variations
const generateSalesData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map((month, i) => ({
    month,
    sales: products.reduce((sum, product) => {
      // Each variation contributes to sales
      const variationSales = product.variations.reduce((varSum, variation) => {
        const unitsSold = faker.number.int({ min: 0, max: Math.max(5, variation.totalStock * 0.7) });
        return varSum + (variation.price * unitsSold);
      }, 0);
      
      return sum + variationSales;
    }, 0),
    orders: Math.round(products.reduce((sum, product) => {
      return sum + product.variations.reduce((varSum, variation) => {
        return varSum + (faker.number.int({ min: 0, max: Math.max(2, variation.totalStock * 0.5) }));
      }, 0);
    }, 0) / 3), // Average of 3 items per order
  })).slice(-6); // Last 6 months
};

export const salesData = generateSalesData();

// Generate weekly sales data
export const weeklySalesData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
  const dayMultiplier = index >= 5 ? 1.8 : 1.0; // Weekends have higher sales
  
  return {
    day,
    sales: products.reduce((sum, product) => {
      const productSales = product.variations.reduce((varSum, variation) => {
        return varSum + (variation.price * faker.number.int({ min: 0, max: 3 }) * dayMultiplier);
      }, 0);
      return sum + productSales;
    }, 0),
    orders: faker.number.int({ min: 20, max: 80 }) * dayMultiplier,
    avgOrderValue: faker.number.float({ min: 800, max: 2500 })
  };
});

// Dashboard metrics
export const totalProducts = products.length;
export const totalVariations = products.reduce((sum, product) => sum + product.variations.length, 0);
export const lowStocks = products.filter(p => p.status === "Low Stock").length;
export const outOfStocks = products.filter(p => p.status === "Out of Stock").length;
export const onSaleProducts = products.filter(p => p.status === "On Sale").length;

export const inventoryValue = products.reduce((sum, p) => {
  const productValue = p.variations.reduce((varSum, variation) => {
    return varSum + (variation.totalStock * variation.cost);
  }, 0);
  return sum + productValue;
}, 0);

export const potentialRevenue = products.reduce((sum, p) => {
  const productRevenue = p.variations.reduce((varSum, variation) => {
    return varSum + (variation.totalStock * variation.price);
  }, 0);
  return sum + productRevenue;
}, 0);

export const totalRevenue = salesData.reduce((sum, month) => sum + month.sales, 0);
export const totalOrders = salesData.reduce((sum, month) => sum + month.orders, 0);

// Sales distribution by platform
export const salesDistribution = platforms.map(platform => {
  const platformSales = products.reduce((sum, product) => {
    const productSales = product.variations.reduce((varSum, variation) => {
      const stock = variation.stockPerPlatform[platform] || 0;
      const sellThroughRate = platform === 'Physical Store' ? 0.4 : 0.6;
      return varSum + (variation.price * stock * sellThroughRate);
    }, 0);
    return sum + productSales;
  }, 0);
  
  return {
    name: platform,
    value: parseFloat(platformSales.toFixed(2)),
    orders: Math.round(platformSales / 1200)
  };
});

// Calculate growth percentages
const currentMonth = salesData[salesData.length - 1];
const previousMonth = salesData[salesData.length - 2];
export const salesGrowth = ((currentMonth.sales - previousMonth.sales) / previousMonth.sales * 100).toFixed(1);
export const ordersGrowth = ((currentMonth.orders - previousMonth.orders) / previousMonth.orders * 100).toFixed(1);

export const mockNotifications = Array.from({ length: 15 }, (_, i) => {
  const product = faker.helpers.arrayElement(products);
  const variation = faker.helpers.arrayElement(product.variations);
  const platform = faker.helpers.arrayElement(platforms);
  const orderId = 1000 + i;
  
  const eventTypes = [
    {
      type: 'low_stock',
      title: `Low stock for ${variation.attributes.color || ''} ${variation.attributes.size || ''} ${product.name}`,
      message: `Only ${variation.stockPerPlatform[platform]} units remaining on ${platform}. SKU: ${variation.sku}`,
      urgency: 'high'
    },
    {
      type: 'out_of_stock',
      title: `${variation.attributes.color || ''} ${variation.attributes.size || ''} variation out of stock`,
      message: `${product.name} variation is out of stock on ${platform}. SKU: ${variation.sku}`,
      urgency: 'high'
    },
    {
      type: 'new_order',
      title: `New order #${orderId} with variations`,
      message: `Customer ordered ${faker.number.int({ min: 1, max: 3 })} variations of ${product.name}. Total: ₱${faker.number.float({ min: 500, max: 5000, precision: 0.01 }).toFixed(2)}`,
      urgency: 'medium'
    },
    {
      type: 'sync_complete',
      title: `${platform} inventory sync completed`,
      message: `Synchronized ${product.variations.length} variations of ${product.name}`,
      urgency: 'low'
    },
    {
      type: 'new_variation',
      title: `New variation added to ${product.name}`,
      message: `Added ${variation.attributes.color || ''} ${variation.attributes.size || ''} variation. SKU: ${variation.sku}`,
      urgency: 'medium'
    }
  ];
  
  const event = faker.helpers.arrayElement(eventTypes);
  const hoursAgo = faker.number.int({ min: 1, max: 72 });
  
  return {
    id: i + 1,
    title: event.title,
    message: event.message,
    type: event.type,
    urgency: event.urgency,
    date: new Date(Date.now() - hoursAgo * 60 * 60 * 1000).toISOString(),
    time: hoursAgo <= 24 ? `${hoursAgo}h ago` : `${Math.floor(hoursAgo / 24)}d ago`,
    read: faker.datatype.boolean(0.3),
    userId: faker.helpers.arrayElement(mockUsers).id,
    productId: product.id,
    variationId: variation.id,
    platform,
    productImage: product.images[0],
    link: `/inventory/${product.sku}?variation=${variation.id}`
  };
});

export const getNotificationsForUser = (userId) =>
  mockNotifications.filter(n => n.userId === userId);

// Additional useful exports
export const topRatedProducts = [...products]
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 5);

export const recentlyAddedProducts = [...products]
  .sort((a, b) => new Date(b.lastSynced) - new Date(a.lastSynced))
  .slice(0, 5);

export const bestSellingProducts = [...products]
  .sort((a, b) => (b.price * b.totalStock * 0.3) - (a.price * a.totalStock * 0.3))
  .slice(0, 5);

// Extract brands from products for compatibility
export const brands = [...new Set(products.map(product => product.brand))];