import { Box, Typography, Card, CardContent, Chip, Divider } from '@mui/material';
import { useBrand } from '../../../theme/brand-context.tsx';
import type { NotificationItem } from '../data/types.ts';

interface NotificationInfoCardsProps {
  notification: NotificationItem;
}

export function NotificationInfoCards({ notification: n }: NotificationInfoCardsProps) {
  const { brand } = useBrand();
  const c = brand.colors;

  const labelSx = { fontSize: '0.7rem', color: c.contentTertiary, mb: 0.25 };
  const valueSx = { fontSize: '0.8rem', color: c.contentPrimary, mb: 1, wordBreak: 'break-all' as const };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 1.5, mb: 3 }}>
      {/* Customer details */}
      <Card variant="outlined" sx={{ bgcolor: c.bgElevated }}>
        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 1.5, color: c.contentPrimary }}>
            Customer details
          </Typography>
          <Typography sx={labelSx}>Email address</Typography>
          <Typography sx={valueSx}>{n.email}</Typography>
          <Typography sx={labelSx}>Phone number</Typography>
          <Typography sx={{ ...valueSx, mb: 0 }}>{n.phone}</Typography>
        </CardContent>
      </Card>

      {/* Transaction details */}
      <Card variant="outlined" sx={{ bgcolor: c.bgElevated }}>
        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: c.contentPrimary }}>
              Transaction details
            </Typography>
            {n.paid && (
              <Chip label="Paid" size="small" color="success" sx={{ height: 20, fontSize: '0.65rem' }} />
            )}
          </Box>
          <Typography sx={labelSx}>Transaction ID</Typography>
          <Typography sx={{ ...valueSx, mb: 0 }}>{n.transactionId}</Typography>
        </CardContent>
      </Card>

      {/* Order totals */}
      <Card variant="outlined" sx={{ bgcolor: c.bgElevated }}>
        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 1.5, color: c.contentPrimary }}>
            Order totals
          </Typography>
          <TotalRow label="Shipping & handling" value="€ 0.00" c={c} />
          <TotalRow label="Discount" value="€ 0.00" c={c} />
          <TotalRow label="Total tax" value={`€ ${n.totalTax}`} c={c} />
          <Divider sx={{ my: 0.5 }} />
          <TotalRow label="Grand total (incl. tax)" value={`€ ${n.price}`} c={c} bold />
        </CardContent>
      </Card>
    </Box>
  );
}

function TotalRow({ label, value, c, bold }: { label: string; value: string; c: { contentTertiary: string; contentPrimary: string }; bold?: boolean }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
      <Typography sx={{ fontSize: '0.7rem', color: c.contentTertiary, fontWeight: bold ? 600 : 400 }}>
        {label}
      </Typography>
      <Typography sx={{ fontSize: '0.7rem', color: c.contentPrimary, fontWeight: bold ? 600 : 400 }}>
        {value}
      </Typography>
    </Box>
  );
}
