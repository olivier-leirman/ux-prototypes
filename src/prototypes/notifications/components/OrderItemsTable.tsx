import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import type { OrderItem } from '../data/types.ts';

interface OrderItemsTableProps {
  items: OrderItem[];
}

export function OrderItemsTable({ items }: OrderItemsTableProps) {
  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell>Code</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>VAT</TableCell>
            <TableCell>Discount</TableCell>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item, i) => (
            <TableRow key={i}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.code}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>€ {item.price.toFixed(2)}</TableCell>
              <TableCell>€ {(item.vat * item.quantity).toFixed(2)} ({item.vatPct})</TableCell>
              <TableCell>€ {item.discount.toFixed(2)}</TableCell>
              <TableCell>€ {item.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
