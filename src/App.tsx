import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import LoginSignupPage from "./pages/LoginSignupPage";
import Dashboard from "./pages/Dashboard";
import OpportunityFinder from "./pages/OpportunityFinder";
import HeatmapPage from "./pages/HeatmapPage";
import IdeaGenerator from "./pages/IdeaGenerator";
import CompetitorAnalysis from "./pages/CompetitorAnalysis";
import MarketAnalytics from "./pages/MarketAnalytics";
import Community from "./pages/Community";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginSignupPage />} />
          
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/finder" element={<OpportunityFinder />} />
            <Route path="/heatmap" element={<HeatmapPage />} />
            <Route path="/idea-generator" element={<IdeaGenerator />} />
            <Route path="/competitors" element={<CompetitorAnalysis />} />
            <Route path="/analytics" element={<MarketAnalytics />} />
            <Route path="/community" element={<Community />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
