import { Box, Typography, Button, IconButton, Chip } from '@mui/material';
import { useBrand } from '../../../theme/brand-context.tsx';
import { Icon } from '../../../components/Icon.tsx';
import { NotificationInfoCards } from './NotificationInfoCards.tsx';
import { OrderItemsTable } from './OrderItemsTable.tsx';
import { ActivityTimeline } from '../../../custom-components/ActivityTimeline.tsx';
import type { NotificationItem } from '../data/types.ts';

const statusColorMap: Record<string, 'success' | 'warning' | 'error' | 'info'> = {
  'Order completed': 'success',
  'Order pending': 'warning',
  'Order cancelled': 'error',
  Processing: 'info',
};

interface NotificationDetailProps {
  notification: NotificationItem;
  onClose: () => void;
  onToggleRead: () => void;
  onPrev: () => void;
  onNext: () => void;
  onCopy: (text: string) => void;
}

export function NotificationDetail({ notification: n, onClose, onToggleRead, onPrev, onNext, onCopy }: NotificationDetailProps) {
  const { brand } = useBrand();
  const c = brand.colors;

  return (
    <Box sx={{
      flex: 2, p: 3, overflowY: 'auto', bgcolor: c.bgSunken,
    }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <IconButton size="small" onClick={onClose}>
            <Icon name="close" size={18} />
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight: 600, color: c.contentPrimary }}>
            Order details
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Button
            variant="outlined"
            size="small"
            onClick={onToggleRead}
            startIcon={<Icon name="mail" size={14} />}
            sx={{ textTransform: 'none', fontSize: '0.8rem' }}
          >
            {n.read ? 'Mark as unread' : 'Mark as read'}
          </Button>
          <Button
            variant="contained"
            size="small"
            endIcon={<Icon name="open_in_new" size={14} />}
            sx={{ textTransform: 'none', fontSize: '0.8rem' }}
          >
            Go to page
          </Button>
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <IconButton size="small" onClick={onPrev} sx={{ border: '1px solid', borderColor: c.borderDefault }}>
              <Icon name="chevron_left" size={16} />
            </IconButton>
            <IconButton size="small" onClick={onNext} sx={{ border: '1px solid', borderColor: c.borderDefault }}>
              <Icon name="chevron_right" size={16} />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Date */}
      <Typography variant="caption" sx={{ color: c.contentTertiary, mb: 1.5, display: 'block' }}>
        {n.date}
      </Typography>

      {/* Order header row */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 0.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
          <Box sx={{
            width: 36, height: 36, borderRadius: 1.5,
            bgcolor: c.brand100, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon name={n.channelIcon} size={18} color={c.brand400} />
          </Box>
          <Typography variant="body1" sx={{ fontWeight: 600, color: c.contentPrimary }}>
            {n.channel}
          </Typography>
          <Typography variant="body2" sx={{ color: c.contentTertiary }}>
            New order
          </Typography>
          <Chip
            label={n.status}
            size="small"
            color={statusColorMap[n.status] || 'default'}
            icon={<Icon name="check_circle" size={14} />}
          />
        </Box>
        <Typography variant="h5" sx={{ fontWeight: 700, color: c.contentPrimary }}>
          € {n.price}
        </Typography>
      </Box>

      {/* Order ID */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2.5 }}>
        <Typography variant="caption" sx={{ color: c.contentTertiary }}>
          {n.orderId}
        </Typography>
        <IconButton size="small" onClick={() => onCopy(n.orderId)} sx={{ p: 0.25 }}>
          <Icon name="content_copy" size={14} color={c.contentTertiary} />
        </IconButton>
      </Box>

      {/* Info cards */}
      <NotificationInfoCards notification={n} />

      {/* Items table */}
      <OrderItemsTable items={n.items} />

      {/* Activity log */}
      {n.notes.length > 0 && (
        <ActivityTimeline entries={n.notes} title="Activity log" />
      )}
    </Box>
  );
}
