import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Extension } from "@/pages/extension.tsx";
import { Dashboard } from "./components/dashboard/Dashboard";
import { Landing } from "./components/landing/landing";

export const AppRouter = () => (
  <HelmetProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/extension" element={<Extension />} />
      </Routes>
    </BrowserRouter>
  </HelmetProvider>
);
