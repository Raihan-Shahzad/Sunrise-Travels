"use client";
import { Button } from "@/app/(components)/ui/button";
import { Input } from "@/app/(components)/ui/input";

export default function PilgrimageForm() {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
      <h3 className="font-heading text-2xl font-bold mb-6 text-slate-900">Custom Package Quote</h3>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <select className="w-full h-10 px-3 py-2 border rounded-md border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
          <option value="">Select Package Type</option>
          <option value="umrah">Umrah</option>
          <option value="hajj">Hajj</option>
        </select>
        <div className="grid grid-cols-2 gap-4">
          <Input placeholder="Desired Month" />
          <Input placeholder="No. of Travellers" type="number" />
        </div>
        <select className="w-full h-10 px-3 py-2 border rounded-md border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
          <option value="">Hotel Preference</option>
          <option value="3-star">3 Star</option>
          <option value="4-star">4 Star</option>
          <option value="5-star">5 Star</option>
        </select>
        <Input placeholder="Full Name" />
        <Input type="email" placeholder="Email Address" />
        <Input type="tel" placeholder="Phone Number" />
        <Button className="w-full h-12 text-lg">Request Quote</Button>
      </form>
    </div>
  );
}
