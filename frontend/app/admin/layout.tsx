import AdminAside from "../components/AsideNav/AdminAside";

export default function OwnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="grid grid-cols-8">
      <AdminAside />

      {children}
    </main>
  );
}
