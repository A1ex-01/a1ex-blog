export default function ExampleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mx-auto h-full max-w-6xl py-4">{children}</div>;
}
