import { LatestReverseRepo } from "./components/latest-reverse-repo";
import { ReverseRepoTrend } from "./components/reverse-repo-trend";

const App = () => {
  return (
    <div className="min-h-screen min-w-[480px] bg-gray-50">
      <header className="border-b bg-white px-6 py-4 shadow-sm">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              Fed Markets Monitor
            </h1>
          </div>
        </div>
      </header>
      <main className="container mx-auto flex flex-col gap-y-8 px-6 py-8">
        <LatestReverseRepo />
        <ReverseRepoTrend />
      </main>
    </div>
  );
};

export default App;
