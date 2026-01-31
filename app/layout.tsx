import './globals.css';

// Minimal root layout - locale-specific layout handles lang/dir/providers
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
