import EmptyState from "@/components/ui/state/empty-state";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary dark:bg-primary-dark">
      <h2 className="text-3xl font-semibold">404</h2>
      <EmptyState
        title="Not Found"
        className="text-2xl"
        linkTitle="Go Home"
        linkTo="home"
        notFound
      />
    </div>
  );
}
