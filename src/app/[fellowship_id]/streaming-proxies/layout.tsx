import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import GlobalErrorBoundary from '@/components/GlobalErrorBoundary';
import { ThemeProvider } from '@/components/theme-provider';
;

export default function StreamingProxiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <GlobalErrorBoundary>
        <main className="min-h-screen bg-background">
          {children}
        </main>
        <Toaster />
        <Sonner />
      </GlobalErrorBoundary>
    </ThemeProvider>
  );
}
