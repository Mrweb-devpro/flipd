export default function Section({ children }: { children: React.ReactNode }) {
  return (
    <section className="w-full flex flex-col h-screen items-center pb-10 ">
      {children}
    </section>
  );
}
