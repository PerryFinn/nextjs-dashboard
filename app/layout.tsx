export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='zh_CN'>
      <body>{children}</body>
    </html>
  );
}
