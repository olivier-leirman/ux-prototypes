import { useState, useMemo, useCallback } from 'react';
import { Box, Typography, Button, Paper, Snackbar, Alert, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useBrand } from '../../theme/brand-context.tsx';
import { Icon } from '../../components/Icon.tsx';
import { ToggleChip, ToggleChipGroup } from '../../components/ToggleChip.tsx';
import { NotificationToolbar } from './components/NotificationToolbar.tsx';
import { NotificationList } from './components/NotificationList.tsx';
import { NotificationDetail } from './components/NotificationDetail.tsx';
import { NotificationPagination } from './components/NotificationPagination.tsx';
import { generateNotifications, TOTAL_NOTIFICATIONS } from './data/mock-notifications.ts';
import type { NotificationCategory } from './data/types.ts';

type TabValue = 'all' | NotificationCategory;

const TAB_OPTIONS: { value: TabValue; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'transactional', label: 'Transactional' },
  { value: 'imports', label: 'Imports & Exports' },
  { value: 'configurations', label: 'Configurations' },
  { value: 'content', label: 'Content' },
];

export function NotificationsPrototype() {
  const { brand, effects } = useBrand();
  const c = brand.colors;
  const navigate = useNavigate();

  // Generate notifications once
  const allNotifications = useMemo(() => generateNotifications(120), []);

  // State
  const [currentTab, setCurrentTab] = useState<TabValue>('all');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filtered notifications
  const filtered = useMemo(() => {
    let list = allNotifications;
    if (currentTab !== 'all') list = list.filter((n) => n.category === currentTab);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter((n) => n.title.toLowerCase().includes(q) || n.channel.toLowerCase().includes(q));
    }
    return list;
  }, [allNotifications, currentTab, searchQuery]);

  const totalDisplay = currentTab === 'all' && !searchQuery ? TOTAL_NOTIFICATIONS : filtered.length;
  const start = (page - 1) * rowsPerPage;
  const pageItems = filtered.slice(start, start + rowsPerPage);
  const selectedNotification = selectedId !== null ? allNotifications.find((n) => n.id === selectedId) ?? null : null;

  // Category counts for chips
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: allNotifications.length };
    for (const n of allNotifications) counts[n.category] = (counts[n.category] || 0) + 1;
    return counts;
  }, [allNotifications]);

  const showToast = useCallback((msg: string) => setToastMessage(msg), []);

  const handleTabChange = (val: string | string[]) => {
    const v = Array.isArray(val) ? val[0] : val;
    setCurrentTab(v as TabValue);
    setPage(1);
    setSelectedId(null);
  };

  const handleMarkAllRead = () => {
    filtered.forEach((n) => { n.read = true; });
    showToast('All notifications marked as read');
  };

  const handleMarkRead = (id: number) => {
    const n = allNotifications.find((x) => x.id === id);
    if (n) { n.read = true; showToast('Marked as read'); }
  };

  const handleToggleRead = () => {
    if (selectedNotification) {
      selectedNotification.read = !selectedNotification.read;
      showToast(selectedNotification.read ? 'Marked as read' : 'Marked as unread');
    }
  };

  const handleNavigateNotif = (dir: number) => {
    const idx = pageItems.findIndex((n) => n.id === selectedId);
    const newIdx = idx + dir;
    if (newIdx >= 0 && newIdx < pageItems.length) {
      setSelectedId(pageItems[newIdx].id);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => showToast('Copied to clipboard'));
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', px: 5, py: 4 }}>
      {/* Back button */}
      <IconButton
        size="small"
        onClick={() => navigate('/')}
        sx={{ mb: 2, border: '1px solid', borderColor: c.borderDefault }}
      >
        <Icon name="arrow_back" size={18} />
      </IconButton>

      {/* Page header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: c.contentPrimary, mb: 1 }}>
            Notifications
          </Typography>
          <Typography variant="body2" sx={{ color: c.contentSecondary }}>
            On this page you will find an overview of all notifications.
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<Icon name="mail" size={18} />}
          sx={{ textTransform: 'none', whiteSpace: 'nowrap' }}
        >
          Set up email notifications
        </Button>
      </Box>

      {/* Category tabs */}
      <Box sx={{ mb: 3 }}>
        <ToggleChipGroup value={currentTab} onChange={handleTabChange} exclusive>
          {TAB_OPTIONS.map((tab) => (
            <ToggleChip
              key={tab.value}
              value={tab.value}
              label={tab.label}
              count={categoryCounts[tab.value] || 0}
            />
          ))}
        </ToggleChipGroup>
      </Box>

      {/* Content area */}
      <Paper
        variant="outlined"
        sx={{
          borderRadius: 3, overflow: 'hidden',
          bgcolor: c.bgElevated,
          boxShadow: effects.shadows.secondaryButton,
        }}
      >
        {/* Toolbar */}
        <NotificationToolbar
          searchQuery={searchQuery}
          onSearchChange={(q) => { setSearchQuery(q); setPage(1); }}
          onMarkAllRead={handleMarkAllRead}
        />

        {/* Split view: list + detail */}
        <Box sx={{
          display: 'flex', gap: 0,
          height: 'calc(100vh - 380px)', minHeight: 400,
        }}>
          <NotificationList
            notifications={pageItems}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onMarkRead={handleMarkRead}
            hasDetail={selectedNotification !== null}
          />
          {selectedNotification && (
            <NotificationDetail
              notification={selectedNotification}
              onClose={() => setSelectedId(null)}
              onToggleRead={handleToggleRead}
              onPrev={() => handleNavigateNotif(-1)}
              onNext={() => handleNavigateNotif(1)}
              onCopy={handleCopy}
            />
          )}
        </Box>

        {/* Pagination */}
        <NotificationPagination
          page={page}
          rowsPerPage={rowsPerPage}
          totalItems={totalDisplay}
          onPageChange={setPage}
          onRowsPerPageChange={(rpp) => { setRowsPerPage(rpp); setPage(1); }}
        />
      </Paper>

      {/* Toast */}
      <Snackbar
        open={toastMessage !== null}
        autoHideDuration={2000}
        onClose={() => setToastMessage(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setToastMessage(null)} sx={{ width: '100%' }}>
          {toastMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
