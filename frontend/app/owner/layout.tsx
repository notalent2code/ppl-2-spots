import OwnerAside from "../components/AsideNav/OwnerAside";

export default function OwnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="grid grid-cols-8">
      <OwnerAside />

      {children}
    </main>
  );
}
