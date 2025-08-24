import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export const Privacy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - Fed Open Market Alerts</title>
        <meta
          name="description"
          content="Privacy policy for Fed Open Market Alerts application and Chrome extension."
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
            <h1>Privacy Policy</h1>

            <p>
              <strong>Last updated:</strong>{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>

            <h2>Information We Collect</h2>
            <p>
              Fed Open Market Alerts does not collect, store, or transmit any
              personal information. The application only:
            </p>
            <ul>
              <li>
                Fetches public Federal Reserve data from the official New York
                Fed API
              </li>
              <li>
                Stores user notification preferences locally in your browser
              </li>
              <li>
                Stores timestamps of last data updates to prevent duplicate
                notifications
              </li>
            </ul>

            <h2>Data Storage</h2>
            <p>
              All user preferences and settings are stored locally on your
              device using browser storage. No data is transmitted to external
              servers except for fetching public Federal Reserve data.
            </p>

            <h2>Third-Party Services</h2>
            <p>
              This application fetches public data from the Federal Reserve Bank
              of New York API (markets.newyorkfed.org). This is the only
              external service we communicate with.
            </p>

            <h2>Chrome Extension Permissions</h2>
            <p>The Chrome extension requests the following permissions:</p>
            <ul>
              <li>
                <strong>Storage:</strong> To save your notification preferences
                locally
              </li>
              <li>
                <strong>Notifications:</strong> To send alerts about new Fed
                operations
              </li>
              <li>
                <strong>Host permissions:</strong> To access Federal Reserve
                data from markets.newyorkfed.org
              </li>
            </ul>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. Any changes
              will be posted on this page with an updated revision date.
            </p>

            <h2>Contact</h2>
            <p>
              If you have questions about this privacy policy, please contact us
              through our{" "}
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
