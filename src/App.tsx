import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import EquipmentOverview from "@/pages/EquipmentOverview";
import ProductionMonitor from "@/pages/ProductionMonitor";
import QualityAnalysis from "@/pages/QualityAnalysis";
import EnergyManagement from "@/pages/EnergyManagement";
import MaintenanceAlerts from "@/pages/MaintenanceAlerts";
import DataReports from "@/pages/DataReports";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<EquipmentOverview />} />
            <Route path="/production" element={<ProductionMonitor />} />
            <Route path="/quality" element={<QualityAnalysis />} />
            <Route path="/energy" element={<EnergyManagement />} />
            <Route path="/maintenance" element={<MaintenanceAlerts />} />
            <Route path="/reports" element={<DataReports />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DashboardLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
