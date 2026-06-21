"use client";
import { Button } from "@/app/(components)/ui/button";
import { Input } from "@/app/(components)/ui/input";

export default function PassportForm() {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
      <h3 className="font-heading text-2xl font-bold mb-6 text-slate-900">Passport Assistance Request</h3>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <select className="w-full h-10 px-3 py-2 border rounded-md border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
          <option value="">Select Service Type</option>
          <option value="renewal">Passport Renewal</option>
          <option value="new">New Passport Application</option>
          <option value="lost">Lost/Damaged Passport</option>
        </select>
        <select className="w-full h-10 px-3 py-2 border rounded-md border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
          <option value="">Urgency Level</option>
          <option value="normal">Normal</option>
          <option value="urgent">Urgent</option>
          <option value="fast-track">Fast Track</option>
        </select>
        <Input placeholder="Full Name" />
        <Input type="email" placeholder="Email Address" />
        <Input type="tel" placeholder="Phone Number" />
        <Button className="w-full h-12 text-lg">Submit Request</Button>
      </form>
    </div>
  );
}
