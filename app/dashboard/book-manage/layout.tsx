import TopArea from './components/top-area';

export default function BookManageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <TopArea />
      <div>{children}</div>
    </section>
  );
}
