import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Contact } from "@/pages/contact.tsx";
import { Extension } from "@/pages/extension.tsx";
import { Privacy } from "@/pages/privacy.tsx";
import { Terms } from "@/pages/terms.tsx";
import { Dashboard } from "./components/dashboard/Dashboard";
import { Landing } from "./components/landing/landing";

export const AppRouter = () => (
  <HelmetProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/extension" element={<Extension />} />
        <Route path="/privacy-policy" element={<Privacy />} />
        <Route path="/terms-of-service" element={<Terms />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  </HelmetProvider>
);
