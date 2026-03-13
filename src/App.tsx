import { ThemeProvider, CssBaseline } from '@mui/material';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { BrandProvider, useBrand } from './theme/brand-context.tsx';
import { PrototypeIndex } from './pages/PrototypeIndex.tsx';
import { NotificationsPrototype } from './prototypes/notifications/NotificationsPrototype.tsx';

function ThemedApp() {
  const { theme } = useBrand();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HashRouter>
        <Routes>
          <Route index element={<PrototypeIndex />} />
          <Route path="notifications" element={<NotificationsPrototype />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <BrandProvider>
      <ThemedApp />
    </BrandProvider>
  );
}
