import { Helmet } from "react-helmet-async";
import { Latest } from "../reverse-repo/latest";
import { Trend } from "../reverse-repo/trend";

export const Dashboard = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard - Fed Open Market Alerts</title>
        <meta
          name="description"
          content="Federal Reserve Open Market Operations dashboard with real-time data and trend analysis."
        />
      </Helmet>

      <div className="min-h-screen min-w-[480px] bg-gray-50">
        <header className="border-b bg-white px-6 py-4 shadow-sm">
          <div className="container mx-auto">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">
                Fed Open Market Alerts
              </h1>
            </div>
          </div>
        </header>
        <main className="container mx-auto flex flex-col gap-y-8 px-6 py-8">
          <Latest />
          <Trend />
        </main>
      </div>
    </>
  );
};
