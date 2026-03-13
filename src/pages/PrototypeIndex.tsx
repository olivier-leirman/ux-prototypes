import { Box, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useBrand } from '../theme/brand-context.tsx';
import { Icon } from '../components/Icon.tsx';

const prototypes = [
  {
    title: 'Notifications',
    description: 'Notification list, detail panel, tabs, search, and pagination',
    path: '/notifications',
    icon: 'notifications',
  },
];

export function PrototypeIndex() {
  const { brand, effects } = useBrand();
  const c = brand.colors;
  const navigate = useNavigate();

  return (
    <Box sx={{ maxWidth: 720, mx: 'auto', px: 3, py: 8 }}>
      <Typography variant="h4" sx={{ fontWeight: 600, mb: 1, color: c.contentPrimary }}>
        UX Prototypes
      </Typography>
      <Typography variant="body1" sx={{ color: c.contentSecondary, mb: 6 }}>
        Interactive prototypes for testing and review.
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {prototypes.map((p) => (
          <Paper
            key={p.path}
            onClick={() => navigate(p.path)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: 2.5,
              px: 3,
              cursor: 'pointer',
              border: '1px solid',
              borderColor: c.borderDefault,
              borderRadius: 3,
              bgcolor: c.bgElevated,
              boxShadow: 'none',
              transition: 'all 0.15s',
              '&:hover': {
                borderColor: c.brand400,
                boxShadow: effects.shadows.secondaryButton,
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{
                width: 40, height: 40, borderRadius: 2,
                bgcolor: c.brand100, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon name={p.icon} size={20} color={c.brand400} />
              </Box>
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 500, color: c.contentPrimary }}>
                  {p.title}
                </Typography>
                <Typography variant="body2" sx={{ color: c.contentTertiary }}>
                  {p.description}
                </Typography>
              </Box>
            </Box>
            <Icon name="arrow_forward" size={20} color={c.contentTertiary} />
          </Paper>
        ))}
      </Box>

      <Typography variant="body2" sx={{ mt: 8, color: c.contentTertiary }}>
        Lochting — UX Prototypes
      </Typography>
    </Box>
  );
}
