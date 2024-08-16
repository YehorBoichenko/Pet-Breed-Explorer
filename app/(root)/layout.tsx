import { Header } from "@/shared/components/Header";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="bg-gray-200">
      <Header />
      {children}
    </main>
  );
}
