import { useState } from "react";
import type { CountryCode } from "libphonenumber-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CountryPhoneInput, DEFAULT_PHONE_COUNTRY } from "@/components/forms/CountryPhoneInput";

export default function ContactForm() {
  const [phone, setPhone] = useState("");
  const [phoneCountry, setPhoneCountry] = useState<CountryCode>(DEFAULT_PHONE_COUNTRY);

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
      <h3 className="font-heading text-2xl font-bold mb-6 text-slate-900">Send us a Message</h3>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-2 gap-4">
          <Input placeholder="First Name" />
          <Input placeholder="Last Name" />
        </div>
        <Input type="email" placeholder="Email Address" />
        <CountryPhoneInput
          id="contact-phone"
          country={phoneCountry}
          onCountryChange={setPhoneCountry}
          value={phone}
          onValueChange={setPhone}
          placeholder="Phone Number"
          className="h-10 rounded-md"
        />
        <Input placeholder="Subject" />
        <Textarea placeholder="How can we help you?" className="min-h-[120px]" />
        <Button className="w-full h-12 text-lg bg-primary hover:bg-primary-600 text-white">Send Message</Button>
      </form>
    </div>
  );
}
