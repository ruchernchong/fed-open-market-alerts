import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service - Fed Open Market Alerts</title>
        <meta
          name="description"
          content="Terms of service for Fed Open Market Alerts application and Chrome extension."
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <header className="border-b bg-white px-6 py-4 shadow-sm">
          <div className="container mx-auto">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="/icon.svg" />
                </Avatar>
                <h1 className="text-2xl font-bold text-gray-900">
                  Fed Open Market Alerts
                </h1>
              </Link>
            </div>
          </div>
        </header>
        <main className="container mx-auto max-w-4xl px-6 py-8">
          <div className="prose prose-slate">
            <h1>Terms of Service</h1>

            <p>
              <strong>Last updated:</strong>{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>

            <h2>Acceptance of Terms</h2>
            <p>
              By using Fed Open Market Alerts, you agree to these terms of
              service. If you do not agree to these terms, please do not use our
              service.
            </p>

            <h2>Service Description</h2>
            <p>
              Fed Open Market Alerts is a free service that provides
              notifications and data visualization for Federal Reserve Open
              Market Operations. The service is available as both a web
              application and Chrome browser extension.
            </p>

            <h2>Data Accuracy</h2>
            <p>
              All data is sourced directly from the Federal Reserve Bank of New
              York's official API. While we strive to provide accurate and
              up-to-date information, we cannot guarantee the accuracy,
              completeness, or timeliness of the data. Users should verify
              information independently for critical decisions.
            </p>

            <h2>Disclaimer</h2>
            <p>
              This service is provided for informational purposes only. It is
              not intended as financial advice. Users should not rely solely on
              this information for investment or financial decisions.
            </p>

            <h2>Availability</h2>
            <p>
              We aim to provide continuous service but cannot guarantee 100%
              uptime. The service may be temporarily unavailable due to
              maintenance, updates, or technical issues.
            </p>

            <h2>User Conduct</h2>
            <p>Users agree not to:</p>
            <ul>
              <li>Use the service for any illegal or unauthorized purposes</li>
              <li>
                Attempt to reverse engineer, modify, or interfere with the
                service
              </li>
              <li>Use automated tools to excessive access the service</li>
            </ul>

            <h2>Limitation of Liability</h2>
            <p>
              Fed Open Market Alerts is provided "as is" without warranties of
              any kind. We are not liable for any damages arising from the use
              of this service.
            </p>

            <h2>Changes to Terms</h2>
            <p>
              We may update these terms from time to time. Continued use of the
              service constitutes acceptance of any changes.
            </p>

            <h2>Contact</h2>
            <p>
              For questions about these terms, please contact us through our{" "}
              <Link
                to="/contact"
                className="text-slate-800 underline hover:text-slate-900"
              >
                contact page
              </Link>{" "}
              or{" "}
              <a
                href="https://github.com/ruchernchong/fed-open-market-alerts"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-800 underline hover:text-slate-900"
              >
                GitHub repository
              </a>
              .
            </p>
          </div>
        </main>
      </div>
    </>
  );
};
