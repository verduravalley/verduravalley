export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  productionInfo: string;
  images: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  photo: string;
  isInMemoriam: boolean;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}

export interface Order {
  id: string;
  customerName: string;
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  type: 'Delivery' | 'Pickup' | 'Dine-in';
  createdAt: string;
}

export let products: Product[] = [
  {
    id: '1',
    name: 'Organic Strawberry',
    slug: 'organic-strawberry',
    category: 'Fruits',
    description: 'Fresh organic strawberries from local farms.',
    productionInfo: 'Grown without pesticides.',
    images: ['https://via.placeholder.com/150'],
  },
  {
    id: '2',
    name: 'Heritage Tomato',
    slug: 'heritage-tomato',
    category: 'Vegetables',
    description: 'Heirloom tomatoes rich in flavor.',
    productionInfo: 'Greenhouse grown.',
    images: ['https://via.placeholder.com/150'],
  }
];

export let teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'John Doe',
    title: 'CEO',
    photo: 'https://via.placeholder.com/150',
    isInMemoriam: false,
  },
  {
    id: '2',
    name: 'Jane Smith',
    title: 'CTO',
    photo: 'https://via.placeholder.com/150',
    isInMemoriam: false,
  }
];

export const leadership = teamMembers; // Backward compatibility for stale imports

export let messages: Message[] = [
  {
    id: '1',
    name: 'Alice Consumer',
    email: 'alice@example.com',
    subject: 'Bulk Order Inquiry',
    message: 'I would like to order 500 units of Organic Strawberry.',
    date: new Date().toISOString(),
  }
];

export let orders: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'Bryan Cranston',
    total: 120.50,
    status: 'Delivered',
    type: 'Delivery',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'ORD-002',
    customerName: 'Aaron Paul',
    total: 45.00,
    status: 'Processing',
    type: 'Pickup',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'ORD-003',
    customerName: 'Anna Gunn',
    total: 89.99,
    status: 'Pending',
    type: 'Delivery',
    createdAt: new Date().toISOString(),
  }
];

export let codeOfConduct = {
  pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
};
