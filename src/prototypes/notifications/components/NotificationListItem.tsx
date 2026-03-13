import { Box, Typography } from '@mui/material';
import { useBrand } from '../../../theme/brand-context.tsx';
import { Icon } from '../../../components/Icon.tsx';
import type { NotificationItem } from '../data/types.ts';

interface NotificationListItemProps {
  notification: NotificationItem;
  isSelected: boolean;
  onSelect: (id: number) => void;
  onMarkRead: (id: number) => void;
}

export function NotificationListItem({ notification: n, isSelected, onSelect, onMarkRead }: NotificationListItemProps) {
  const { brand } = useBrand();
  const c = brand.colors;

  return (
    <Box
      onClick={() => onSelect(n.id)}
      sx={{
        display: 'flex', alignItems: 'center', gap: 1.5,
        px: 2.5, py: 2,
        borderBottom: '1px solid', borderColor: c.borderWeak,
        cursor: 'pointer', transition: 'background 0.1s',
        bgcolor: isSelected ? c.bgSunken : 'transparent',
        '&:hover': { bgcolor: c.bgSunken },
        '&:first-of-type': { borderTop: '1px solid', borderTopColor: c.borderWeak },
      }}
    >
      {/* Channel icon */}
      <Box sx={{
        width: 36, height: 36, borderRadius: 1.5,
        bgcolor: c.brand100, display: 'flex',
        alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        <Icon name={n.channelIcon} size={18} color={c.brand400} />
      </Box>

      {/* Content */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="body2" sx={{
          fontWeight: 500, color: c.contentPrimary,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {n.title}
        </Typography>
        <Typography variant="caption" sx={{ color: c.contentTertiary }}>
          {n.time} · {n.channel}
        </Typography>
      </Box>

      {/* Read status */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
        {n.read ? (
          <Typography variant="caption" sx={{ color: c.contentTertiary }}>Read</Typography>
        ) : (
          <>
            <Typography
              variant="caption"
              onClick={(e) => { e.stopPropagation(); onMarkRead(n.id); }}
              sx={{
                color: c.brand400, cursor: 'pointer', whiteSpace: 'nowrap',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              Mark as read
            </Typography>
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: c.brand400, flexShrink: 0 }} />
          </>
        )}
      </Box>
    </Box>
  );
}
