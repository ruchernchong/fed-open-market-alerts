import { LatestReverseRepo } from "./components/latest-reverse-repo";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b px-6 py-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">
            Fed Markets Monitor
          </h1>
        </div>
      </header>
      <main className="container mx-auto px-6 py-8">
        <LatestReverseRepo />
      </main>
    </div>
  );
}

export default App;
