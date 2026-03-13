import { Box, Typography, Select, MenuItem, type SelectChangeEvent } from '@mui/material';
import { useBrand } from '../../../theme/brand-context.tsx';
import { Icon } from '../../../components/Icon.tsx';

interface NotificationPaginationProps {
  page: number;
  rowsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
}

export function NotificationPagination({ page, rowsPerPage, totalItems, onPageChange, onRowsPerPageChange }: NotificationPaginationProps) {
  const { brand, effects } = useBrand();
  const c = brand.colors;
  const totalPages = Math.max(1, Math.ceil(totalItems / rowsPerPage));
  const start = (page - 1) * rowsPerPage + 1;
  const end = Math.min(page * rowsPerPage, totalItems);

  const getVisiblePages = () => {
    const pages: (number | '...')[] = [];
    const maxBtns = 5;
    let pStart = Math.max(1, page - 2);
    let pEnd = Math.min(totalPages, pStart + maxBtns - 1);
    if (pEnd - pStart < maxBtns - 1) pStart = Math.max(1, pEnd - maxBtns + 1);
    if (pStart > 1) pages.push('...');
    for (let p = pStart; p <= pEnd; p++) pages.push(p);
    if (pEnd < totalPages) { pages.push('...'); pages.push(totalPages); }
    return pages;
  };

  const btnSx = (active: boolean) => ({
    width: 32, height: 32, borderRadius: 1.5,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', fontSize: '0.8rem', fontWeight: active ? 600 : 400,
    transition: 'all 0.15s', userSelect: 'none' as const,
    ...(active
      ? { background: effects.gradients.primary, color: '#fff', boxShadow: effects.shadows.primaryButton }
      : { border: '1px solid', borderColor: c.borderDefault, bgcolor: c.bgElevated, color: c.contentSecondary,
          '&:hover': { borderColor: c.brand400, color: c.brand400 } }),
  });

  const navBtnSx = (disabled: boolean) => ({
    ...btnSx(false),
    opacity: disabled ? 0.3 : 1,
    pointerEvents: disabled ? 'none' as const : 'auto' as const,
  });

  return (
    <Box sx={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      px: 2.5, py: 2, borderTop: '1px solid', borderColor: c.borderWeak,
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
          <Typography variant="caption" sx={{ color: c.contentTertiary, textTransform: 'uppercase', fontWeight: 500 }}>
            Rows per page:
          </Typography>
          <Select
            size="small"
            value={rowsPerPage}
            onChange={(e: SelectChangeEvent<number>) => onRowsPerPageChange(Number(e.target.value))}
            sx={{ minWidth: 60, '& .MuiSelect-select': { py: 0.5, fontSize: '0.8rem' } }}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </Box>
        <Typography variant="caption" sx={{ color: c.contentTertiary }}>
          {start}-{end} OF {totalItems}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Box onClick={() => onPageChange(1)} sx={navBtnSx(page <= 1)}>
          <Icon name="first_page" size={16} />
        </Box>
        <Box onClick={() => onPageChange(page - 1)} sx={navBtnSx(page <= 1)}>
          <Icon name="chevron_left" size={16} />
        </Box>
        {getVisiblePages().map((p, i) =>
          p === '...' ? (
            <Typography key={`e${i}`} variant="caption" sx={{ px: 0.5, color: c.contentTertiary }}>…</Typography>
          ) : (
            <Box key={p} onClick={() => onPageChange(p as number)} sx={btnSx(p === page)}>
              {p}
            </Box>
          ),
        )}
        <Box onClick={() => onPageChange(page + 1)} sx={navBtnSx(page >= totalPages)}>
          <Icon name="chevron_right" size={16} />
        </Box>
        <Box onClick={() => onPageChange(totalPages)} sx={navBtnSx(page >= totalPages)}>
          <Icon name="last_page" size={16} />
        </Box>
      </Box>
    </Box>
  );
}
