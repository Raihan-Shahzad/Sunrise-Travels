import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { StickyCTA } from "@/components/layout/StickyCTA";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import HomePage from "@/pages/HomePage";
import ContactPage from "@/pages/ContactPage";
import FlightsPage from "@/pages/FlightsPage";
import UmrahPage from "@/pages/HajjUmrahPage";
import HajjPage from "@/pages/HajjPage";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/flights" component={FlightsPage} />
          <Route path="/umrah" component={UmrahPage} />
          <Route path="/hajj" component={HajjPage} />
          <Route path="/contact" component={ContactPage} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <StickyCTA />
      <WhatsAppFloat />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <Router />
        <Toaster />
      </WouterRouter>
    </QueryClientProvider>
  );
}

export default App;
