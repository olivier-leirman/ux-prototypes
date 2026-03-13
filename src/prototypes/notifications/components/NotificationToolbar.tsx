import { Box, Button } from '@mui/material';
import { useBrand } from '../../../theme/brand-context.tsx';
import { SearchField } from '../../../components/SearchField.tsx';
import { Icon } from '../../../components/Icon.tsx';

interface NotificationToolbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onMarkAllRead: () => void;
}

export function NotificationToolbar({ searchQuery, onSearchChange, onMarkAllRead }: NotificationToolbarProps) {
  const { brand } = useBrand();
  const c = brand.colors;

  return (
    <Box sx={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      p: 2, px: 2.5,
    }}>
      <SearchField
        placeholder="Search for notification"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        sx={{ width: 320 }}
      />
      <Button
        variant="outlined"
        onClick={onMarkAllRead}
        endIcon={<Icon name="done_all" size={16} color={c.brand400} />}
        sx={{
          borderRadius: 6, borderColor: c.brand400, color: c.brand400,
          fontWeight: 500, textTransform: 'none', px: 2.5,
          '&:hover': { borderColor: c.brand400, bgcolor: c.brand100 },
        }}
      >
        Mark all as read
      </Button>
    </Box>
  );
}
