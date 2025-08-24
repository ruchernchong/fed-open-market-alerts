import { useQuery } from "@tanstack/react-query";
import {
  BarChart3,
  Bell,
  Building2,
  Clock,
  ExternalLink,
  Shield,
  TrendingUp,
} from "lucide-react";
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

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-6xl">
              <div className="mb-12 text-center">
                <h3 className="mb-4 text-3xl font-bold text-slate-900">
                  Key Features
                </h3>
                <p className="text-lg text-slate-600">
                  Everything you need to stay informed about Fed operations
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                    <Bell className="h-8 w-8 text-slate-600" />
                  </div>
                  <h4 className="mb-2 text-xl font-semibold text-slate-900">
                    Automated Alerts
                  </h4>
                  <p className="text-slate-600">
                    Get notified when the Federal Reserve publishes new
                    operation data (weekdays at 1:20 PM EST)
                  </p>
                </div>

                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                    <BarChart3 className="h-8 w-8 text-slate-600" />
                  </div>
                  <h4 className="mb-2 text-xl font-semibold text-slate-900">
                    Data Visualization
                  </h4>
                  <p className="text-slate-600">
                    Interactive charts and trends to understand market patterns
                    and operation history
                  </p>
                </div>

                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                    <Shield className="h-8 w-8 text-slate-600" />
                  </div>
                  <h4 className="mb-2 text-xl font-semibold text-slate-900">
                    Reliable Data
                  </h4>
                  <p className="text-slate-600">
                    Direct integration with Federal Reserve Bank of New York
                    official data sources
                  </p>
                </div>
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

        {/* How It Works */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-6xl">
              <div className="mb-12 text-center">
                <h3 className="mb-4 text-3xl font-bold text-slate-900">
                  How It Works
                </h3>
                <p className="text-lg text-slate-600">
                  Get started in three simple steps
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <div className="text-center">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-800 text-white">
                    <span className="text-2xl font-bold">1</span>
                  </div>
                  <h4 className="mb-3 text-xl font-semibold text-slate-900">
                    Install Extension
                  </h4>
                  <p className="text-slate-600">
                    Add the Chrome extension or bookmark the web dashboard to
                    access Fed operation data
                  </p>
                </div>

                <div className="text-center">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-800 text-white">
                    <span className="text-2xl font-bold">2</span>
                  </div>
                  <h4 className="mb-3 text-xl font-semibold text-slate-900">
                    Configure Alerts
                  </h4>
                  <p className="text-slate-600">
                    Set your notification preferences to receive alerts when new
                    operations are published
                  </p>
                </div>

                <div className="text-center">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-800 text-white">
                    <span className="text-2xl font-bold">3</span>
                  </div>
                  <h4 className="mb-3 text-xl font-semibold text-slate-900">
                    Stay Informed
                  </h4>
                  <p className="text-slate-600">
                    Receive notifications every weekday at 1:20 PM EST when new
                    Fed data is available
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Educational Content */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-4xl">
              <div className="mb-12 text-center">
                <h3 className="mb-4 text-3xl font-bold text-slate-900">
                  Understanding Fed Operations
                </h3>
                <p className="text-lg text-slate-600">
                  Learn about Federal Reserve Open Market Operations
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div>
                    <h4 className="mb-4 text-xl font-semibold text-slate-900">
                      What are Reverse Repo Operations?
                    </h4>
                    <p className="mb-4 text-slate-600">
                      Reverse repurchase agreements (reverse repos) are monetary
                      policy tools where the Federal Reserve sells securities to
                      eligible institutions with an agreement to buy them back
                      at a specified price on a future date.
                    </p>
                    <p className="text-slate-600">
                      These operations help the Fed manage short-term interest
                      rates and control the money supply in financial markets.
                    </p>
                  </div>

                  <div>
                    <h4 className="mb-4 text-xl font-semibold text-slate-900">
                      Why Monitor These Operations?
                    </h4>
                    <p className="mb-4 text-slate-600">
                      Fed operations provide insights into monetary policy
                      direction and market liquidity conditions. Changes in
                      operation volumes and rates can signal policy shifts.
                    </p>
                    <p className="text-slate-600">
                      Financial professionals, researchers, and market
                      participants use this data to understand Fed policy
                      implementation and market dynamics.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-4xl">
              <div className="mb-12 text-center">
                <h3 className="mb-4 text-3xl font-bold text-slate-900">
                  Frequently Asked Questions
                </h3>
              </div>

              <div className="space-y-6">
                <div className="rounded-lg bg-white p-6 shadow-sm">
                  <h4 className="mb-3 text-lg font-semibold text-slate-900">
                    How often is the data updated?
                  </h4>
                  <p className="text-slate-600">
                    The Federal Reserve typically publishes new operation data
                    on weekdays around 1:15 PM EST. Our system checks for
                    updates at 1:20 PM EST and sends alerts when new data is
                    available.
                  </p>
                </div>

                <div className="rounded-lg bg-white p-6 shadow-sm">
                  <h4 className="mb-3 text-lg font-semibold text-slate-900">
                    Is this data official?
                  </h4>
                  <p className="text-slate-600">
                    Yes, all data is sourced directly from the Federal Reserve
                    Bank of New York's official API at markets.newyorkfed.org.
                    We do not modify or interpret the data.
                  </p>
                </div>

                <div className="rounded-lg bg-white p-6 shadow-sm">
                  <h4 className="mb-3 text-lg font-semibold text-slate-900">
                    Do I need the Chrome extension?
                  </h4>
                  <p className="text-slate-600">
                    No, you can use the web dashboard without installing
                    anything. The Chrome extension provides push notifications
                    and quick access from your browser toolbar.
                  </p>
                </div>

                <div className="rounded-lg bg-white p-6 shadow-sm">
                  <h4 className="mb-3 text-lg font-semibold text-slate-900">
                    Is this service free?
                  </h4>
                  <p className="text-slate-600">
                    Yes, Fed Open Market Alerts is completely free to use. Both
                    the web dashboard and Chrome extension are available at no
                    cost. This project is also open-source - you can view the
                    code, contribute, or report issues on{" "}
                    <a
                      href="https://github.com/ruchernchong/fed-open-market-alerts"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-800 hover:text-slate-900 underline font-medium"
                    >
                      GitHub
                    </a>
                    .
                  </p>
                </div>

                <div className="rounded-lg bg-white p-6 shadow-sm">
                  <h4 className="mb-3 text-lg font-semibold text-slate-900">
                    Can I customize notifications?
                  </h4>
                  <p className="text-slate-600">
                    Yes, the Chrome extension includes settings to customize
                    your notification preferences and control when you receive
                    alerts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-800 py-8 text-white">
          <div className="container mx-auto px-6">
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="/icon.svg" />
                </Avatar>
                <span className="text-lg font-semibold">
                  Fed Open Market Alerts
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                <a
                  href="/privacy"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="/terms"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Terms of Service
                </a>
                <a
                  href="/contact"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Contact
                </a>
                <a
                  href="/about"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  About
                </a>
                <a
                  href="https://github.com/ruchernchong/fed-open-market-alerts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  GitHub
                </a>
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
