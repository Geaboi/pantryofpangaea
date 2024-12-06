// import DeployButton from "@/components/deploy-button";
// import { EnvVarWarning } from "@/components/env-var-warning";
// import HeaderAuth from "@/components/header-auth";
// import { ThemeSwitcher } from "@/components/theme-switcher";
// import { hasEnvVars } from "@/utils/supabase/check-env-vars";
// import { GeistSans } from "geist/font/sans";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Background from "@/components/background"; // Import Background component
import { ThemeProvider } from "next-themes";
import './globals.css';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: {
    template: '%s | Pantry of Pangaea',
    default: 'Pantry of Pangaea',
  },
  description: "The last cookbook you'll ever need.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg" sizes="any" href="/icon.svg" />
      </head>
      <body>
        <ThemeProvider
          attribute="data-mode"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Add the Background component */}
          <Background />
          <main className="min-h-screen flex flex-col items-center">
            <Header />
            <div className="flex-grow w-screen flex flex-col items-center">
              <div className="text-slate-800 dark:text-slate-300 max-w-5xl py-5">
                {children}
              </div>
            </div>
            <Footer />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
