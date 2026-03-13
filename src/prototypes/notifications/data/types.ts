export interface OrderItem {
  name: string;
  code: string;
  quantity: number;
  price: number;
  vat: number;
  vatPct: string;
  discount: number;
  total: string;
}

export interface ActivityNote {
  time: string;
  text: string;
}

export type NotificationCategory = 'transactional' | 'imports' | 'configurations' | 'content';

export interface NotificationItem {
  id: number;
  title: string;
  time: string;
  channel: string;
  channelIcon: string;
  category: NotificationCategory;
  read: boolean;
  status: string;
  orderId: string;
  transactionId: string;
  date: string;
  email: string;
  phone: string;
  price: string;
  items: OrderItem[];
  totalTax: string;
  paid: boolean;
  notes: ActivityNote[];
}
