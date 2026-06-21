import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function FlightEnquiryForm() {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
      <h3 className="font-heading text-2xl font-bold mb-6 text-slate-900">Request Flight Quote</h3>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-2 gap-4">
          <Input placeholder="From (e.g. LHR)" />
          <Input placeholder="To (e.g. ISB)" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input type="date" placeholder="Depart" />
          <Input type="date" placeholder="Return" />
        </div>
        <Input placeholder="Number of Passengers" />
        <Input placeholder="Full Name" />
        <Input type="email" placeholder="Email Address" />
        <Input type="tel" placeholder="Phone Number" />
        <Button className="w-full h-12 text-lg bg-primary hover:bg-primary-600 text-white">Get Best Price</Button>
      </form>
    </div>
  );
}
