import { Box } from '@mui/material';
import { NotificationListItem } from './NotificationListItem.tsx';
import type { NotificationItem } from '../data/types.ts';

interface NotificationListProps {
  notifications: NotificationItem[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  onMarkRead: (id: number) => void;
  hasDetail: boolean;
}

export function NotificationList({ notifications, selectedId, onSelect, onMarkRead, hasDetail }: NotificationListProps) {
  return (
    <Box sx={{
      flex: 1, minWidth: 0, overflowY: 'auto',
      ...(hasDetail && { borderRight: '1px solid', borderColor: 'divider' }),
    }}>
      {notifications.map((n) => (
        <NotificationListItem
          key={n.id}
          notification={n}
          isSelected={n.id === selectedId}
          onSelect={onSelect}
          onMarkRead={onMarkRead}
        />
      ))}
    </Box>
  );
}
