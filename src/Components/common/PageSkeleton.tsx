export default function PageSkeleton() {
  return (
    <main className="min-h-[70vh] bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-6xl animate-pulse space-y-6">
        <div className="h-4 w-48 rounded bg-slate-200" />
        <div className="h-24 rounded-xl bg-slate-200" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }, (_, index) => <div key={index} className="h-64 rounded-xl bg-white shadow-sm ring-1 ring-slate-100" />)}
        </div>
      </div>
    </main>
  );
}
