import { useQuery } from "@tanstack/react-query";
import { Building2, ExternalLink, TrendingUp } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Loader } from "@/components/common/loader";
import { MetricCard } from "@/components/common/metric-card";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarImage } from "@/components/ui/avatar.tsx";
import { getLatestReverseRepo } from "@/services/reverse-repo";

export const Landing = () => {
  const {
    data: operation,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["latest-reverse-repo"],
    queryFn: getLatestReverseRepo,
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      notation: "compact",
      compactDisplay: "short",
    }).format(amount);
  };

  return (
    <>
      <Helmet>
        <title>
          Fed Open Market Alerts - Monitor Federal Reserve Operations
        </title>
        <meta
          name="description"
          content="Stay informed about Federal Reserve Open Market Operations with real-time alerts and data tracking. Chrome extension available."
        />
        <meta
          name="keywords"
          content="Federal Reserve, Fed operations, reverse repo, market alerts, Chrome extension"
        />
        <meta property="og:title" content="Fed Open Market Alerts" />
        <meta
          property="og:description"
          content="Monitor Federal Reserve Open Market Operations with automated alerts"
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="border-b bg-white p-6 shadow-md">
          <div className="container mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="/icon.svg" />
                </Avatar>
                <h1 className="text-2xl font-bold text-gray-900">
                  Fed Open Market Alerts
                </h1>
              </div>
              <div className="hidden md:block">
                <Link
                  to="/extension"
                  target="_blank"
                  className="flex items-center gap-2 rounded-full bg-slate-800 px-6 py-4 text-white transition-colors hover:bg-slate-700"
                >
                  Add to Browser
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-slate-800 to-slate-900 py-20 text-white">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="mb-6 text-5xl leading-tight font-bold">
                Federal Reserve Market{" "}
                <span className="bg-red-400 bg-clip-text text-transparent">
                  Alerts
                </span>
              </h2>
              <p className="mb-8 text-xl text-slate-300">
                Get updated alerts on Federal Reserve Open Market Operations.
              </p>

              {/* Chrome Extension CTA */}
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Link to="/extension" target="_blank">
                  <img
                    src="/chrome-web-store-badge.png"
                    alt="Available in the Chrome Web Store"
                    className="h-15"
                  />
                </Link>

                <Link
                  to="/dashboard"
                  className="rounded-xl border-2 border-white/20 px-8 py-4 text-lg font-semibold transition-all hover:bg-white/10"
                >
                  Try Web Version
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Live Data Preview */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-6xl">
              <div className="mb-12 text-center">
                <h3 className="mb-4 text-3xl font-bold text-slate-900">
                  Latest Data
                </h3>
                <p className="text-lg text-slate-600">
                  Latest data from the Federal Reserve Bank of New York
                </p>
              </div>

              {loading && <Loader message="Loading latest operation..." />}

              {error && (
                <Alert variant="destructive">
                  <AlertTitle>Unable to load current market data</AlertTitle>
                </Alert>
              )}

              {operation && (
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
                  <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-6">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-white/10 p-2">
                        <TrendingUp className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-white">
                        Latest Operation -{" "}
                        {new Date(operation.operationDate).toLocaleDateString(
                          "en-US",
                          {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          },
                        )}
                      </h4>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <MetricCard
                        title="Total Submitted"
                        value={formatCurrency(operation.totalAmtSubmitted)}
                        icon={Building2}
                      />
                      <MetricCard
                        title="Total Accepted"
                        value={formatCurrency(operation.totalAmtAccepted)}
                        icon={TrendingUp}
                      />
                      <MetricCard
                        title="Award Rate"
                        value={`${operation.details[0]?.percentAwardRate.toFixed(2)}%`}
                        icon={TrendingUp}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8 text-center">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-2 rounded-lg bg-slate-800 px-6 py-3 text-white transition-colors hover:bg-slate-700"
                >
                  <span>View Dashboard</span>
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-800 py-8 text-white">
          <div className="container mx-auto px-6">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="/icon.svg" />
                </Avatar>
                <span className="text-lg font-semibold">
                  Fed Open Market Alerts
                </span>
              </div>
              <div className="text-center text-sm text-slate-400 md:text-right">
                <p>Data sourced from the Federal Reserve Bank of New York</p>
                <p className="mt-1">
                  © {new Date().getFullYear()} Fed Open Market Alerts
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};
