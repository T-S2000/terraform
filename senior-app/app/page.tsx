export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold">
        Project Management Dashboard
      </h1>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border p-6">
          <h2 className="text-lg font-semibold">Projects</h2>
          <p className="mt-2 text-3xl font-bold">12</p>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="text-lg font-semibold">Tasks</h2>
          <p className="mt-2 text-3xl font-bold">48</p>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="text-lg font-semibold">Team Members</h2>
          <p className="mt-2 text-3xl font-bold">8</p>
        </div>
      </div>
    </main>
  );
}