import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { StickyCTA } from "@/components/layout/StickyCTA";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import FlightsPage from "@/pages/FlightsPage";
import HajjUmrahPage from "@/pages/HajjUmrahPage";
import NADRAPage from "@/pages/NADRAPage";
import VisaPage from "@/pages/VisaPage";
import PassportPage from "@/pages/PassportPage";
import BlogPage from "@/pages/BlogPage";
import BlogPostPage from "@/pages/BlogPostPage";
import AppointmentsPage from "@/pages/AppointmentsPage";
import AppointmentInboxPage from "@/pages/AppointmentInboxPage";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/flights" component={FlightsPage} />
          <Route path="/hajj-umrah" component={HajjUmrahPage} />
          <Route path="/nadra-assistance" component={NADRAPage} />
          <Route path="/visa-assistance" component={VisaPage} />
          <Route path="/pakistani-visa-assistance" component={VisaPage} />
          <Route path="/passport-assistance" component={PassportPage} />
          <Route path="/blog" component={BlogPage} />
          <Route path="/blog/:slug" component={BlogPostPage} />
          <Route path="/appointments" component={AppointmentsPage} />
          <Route path="/appointment-inbox" component={AppointmentInboxPage} />
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
