import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function VisaForm() {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
      <h3 className="font-heading text-2xl font-bold mb-6 text-slate-900">Request Visa Consultation</h3>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <select className="w-full h-10 px-3 py-2 border rounded-md border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
          <option value="">Select Visa Type</option>
          <option value="tourist">Tourist Visa</option>
          <option value="family">Family Visit Visa</option>
          <option value="business">Business Visa</option>
          <option value="renewal">Visa Renewal / Extension</option>
          <option value="other">Other Query</option>
        </select>
        <Input placeholder="Full Name" />
        <Input type="email" placeholder="Email Address" />
        <Input type="tel" placeholder="Phone Number" />
        <Input type="date" placeholder="Expected Travel Date" />
        <Textarea placeholder="Briefly describe your visa requirements..." className="min-h-[80px]" />
        <Button className="w-full h-12 text-lg bg-primary hover:bg-primary-600 text-white">Submit Request</Button>
      </form>
    </div>
  );
}
