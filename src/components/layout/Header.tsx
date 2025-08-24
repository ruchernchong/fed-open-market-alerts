import { Link } from "react-router-dom";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface HeaderProps {
  showAction?: boolean;
  actionText?: string;
  actionHref?: string;
  homeLink?: boolean;
}

export const Header = ({
  showAction = false,
  actionText = "Add to Browser",
  actionHref = "/extension",
  homeLink = false,
}: HeaderProps) => {
  const headerContent = (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarImage src="/icon.svg" />
      </Avatar>
      <h1 className="text-2xl font-bold text-gray-900">
        Fed Open Market Alerts
      </h1>
    </div>
  );

  return (
    <header className="border-b bg-white px-6 py-4 shadow-sm">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          {homeLink ? (
            <Link to="/" className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="/icon.svg" />
              </Avatar>
              <h1 className="text-2xl font-bold text-gray-900">
                Fed Open Market Alerts
              </h1>
            </Link>
          ) : (
            headerContent
          )}

          {showAction && (
            <div className="hidden md:block">
              <Link
                to={actionHref}
                target="_blank"
                className="flex items-center gap-2 rounded-full bg-slate-800 px-6 py-4 text-white transition-colors hover:bg-slate-700"
              >
                {actionText}
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
