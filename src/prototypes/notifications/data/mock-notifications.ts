import type { NotificationItem, NotificationCategory, OrderItem } from './types.ts';

const channels = ['Vending Machine', 'Webshop', 'Presentation'];
const channelIcons: Record<string, string> = { 'Vending Machine': 'precision_manufacturing', Webshop: 'shopping_cart', Presentation: 'play_circle' };
const categories: NotificationCategory[] = ['transactional', 'imports', 'configurations', 'content'];
const statuses = ['Order completed', 'Order pending', 'Order cancelled', 'Processing'];
const baseItems = [
  { name: 'Dafalgan Pediatrie 80mg Suppo 12', code: 'CNK: 3606134', price: 3.61, vat: 0.20, vatPct: '6%' },
  { name: 'Ibuprofen 400mg Tablets 20', code: 'CNK: 2504821', price: 5.49, vat: 0.33, vatPct: '6%' },
  { name: 'Paracetamol 500mg Caps 30', code: 'CNK: 1108742', price: 2.89, vat: 0.17, vatPct: '6%' },
  { name: 'Vitamine D3 1000IU Drops', code: 'CNK: 4401239', price: 8.95, vat: 0.54, vatPct: '6%' },
];
const names = ['john.doe@vending-solutions.com', 'anna.smith@pharmacy.be', 'marc.dupont@health.eu', 'lisa.janssen@care.nl'];
const phones = ['+32 478 99 66 44', '+32 495 12 34 56', '+32 468 77 88 99', '+32 487 55 44 33'];
const times = ['10 minutes ago', '25 minutes ago', '1 hour ago', '2 hours ago', '5 hours ago', 'Yesterday', '2 days ago'];

function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }
function randId() { return 'SC-' + crypto.getRandomValues(new Uint8Array(8)).reduce((a, b) => a + b.toString(16).padStart(2, '0'), '') + ' - M' + String(Math.floor(Math.random() * 99999)).padStart(5, '0'); }
function randTxId() { return 'transaction-' + crypto.getRandomValues(new Uint8Array(8)).reduce((a, b) => a + b.toString(16).padStart(2, '0'), ''); }

export const TOTAL_NOTIFICATIONS = 9420;

export function generateNotifications(count = 120): NotificationItem[] {
  const result: NotificationItem[] = [];
  for (let i = 0; i < count; i++) {
    const channel = pick(channels);
    const cat: NotificationCategory = i < 40 ? 'transactional' : pick(categories);
    const status = pick(statuses);
    const numItems = i % 3 === 0 ? Math.floor(Math.random() * 6) + 4 : Math.floor(Math.random() * 3) + 1;
    const orderItems: OrderItem[] = [];
    for (let j = 0; j < numItems; j++) {
      const item = pick(baseItems);
      const qty = Math.floor(Math.random() * 3) + 1;
      orderItems.push({ ...item, quantity: qty, total: (item.price * qty).toFixed(2), discount: 0 });
    }
    const grandTotal = orderItems.reduce((s, it) => s + parseFloat(it.total), 0).toFixed(2);
    const totalTax = orderItems.reduce((s, it) => s + it.vat * it.quantity, 0).toFixed(2);
    const month = 'NOV';
    const day = Math.floor(Math.random() * 28) + 1;

    result.push({
      id: i,
      title: cat === 'transactional' ? `New order from ${channel}` : cat === 'imports' ? 'Import completed' : cat === 'configurations' ? 'Configuration updated' : 'Content published',
      time: pick(times),
      channel,
      channelIcon: channelIcons[channel] || 'play_circle',
      category: cat,
      read: i > 4 ? Math.random() > 0.5 : false,
      status,
      orderId: randId(),
      transactionId: randTxId(),
      date: `${month} ${day} 2025, ${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')} AM`,
      email: pick(names),
      phone: pick(phones),
      price: grandTotal,
      items: orderItems,
      totalTax,
      paid: Math.random() > 0.3,
      notes: i % 2 === 0 ? [
        { time: `${month} ${Math.floor(Math.random() * 28) + 1} 2025, 09:15 AM`, text: `Order placed by customer via ${channel}` },
        { time: `${month} ${Math.floor(Math.random() * 28) + 1} 2025, 09:16 AM`, text: 'Payment received and verified' },
        { time: `${month} ${Math.floor(Math.random() * 28) + 1} 2025, 09:20 AM`, text: 'Order confirmed and sent to fulfillment' },
        { time: `${month} ${Math.floor(Math.random() * 28) + 1} 2025, 10:05 AM`, text: 'Items picked and packed' },
        { time: `${month} ${Math.floor(Math.random() * 28) + 1} 2025, 10:28 AM`, text: 'Order dispatched to customer' },
      ] : [],
    });
  }
  return result;
}
