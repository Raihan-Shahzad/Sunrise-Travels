import { useState } from "react";
import type { CountryCode } from "libphonenumber-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CountryPhoneInput, DEFAULT_PHONE_COUNTRY } from "@/components/forms/CountryPhoneInput";

export default function NADRAForm() {
  const [phone, setPhone] = useState("");
  const [phoneCountry, setPhoneCountry] = useState<CountryCode>(DEFAULT_PHONE_COUNTRY);

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
      <h3 className="font-heading text-2xl font-bold mb-6 text-slate-900">Request NADRA Assistance</h3>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <select className="w-full h-10 px-3 py-2 border rounded-md border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
          <option value="">Select Service Type</option>
          <option value="nicop-new">New NICOP</option>
          <option value="nicop-renewal">NICOP Renewal</option>
          <option value="other">Other NADRA Query (FRC certificate, POC card etc.)</option>
        </select>
        <Input placeholder="Full Name" />
        <Input type="email" placeholder="Email Address" />
        <CountryPhoneInput
          id="nadra-phone"
          country={phoneCountry}
          onCountryChange={setPhoneCountry}
          value={phone}
          onValueChange={setPhone}
          placeholder="Phone Number"
          className="h-10 rounded-md"
        />
        <Textarea placeholder="Briefly describe what you need help with..." className="min-h-[100px]" />
        <Button className="w-full h-12 text-lg bg-primary hover:bg-primary-600 text-white">Submit Request</Button>
      </form>
    </div>
  );
}
