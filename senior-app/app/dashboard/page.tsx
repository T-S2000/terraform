import StatCard from "@/components/StatCard";

export default function DashboardPage() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold">
        Dashboard
      </h1>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <StatCard title="Projects" value={12} />
        <StatCard title="Tasks" value={48} />
        <StatCard title="Team Members" value={8} />
      </div>
    </main>
  );
}