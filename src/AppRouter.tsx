import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./components/dashboard/Dashboard";
import { Landing } from "./components/landing/landing";

export const AppRouter = () => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
};
