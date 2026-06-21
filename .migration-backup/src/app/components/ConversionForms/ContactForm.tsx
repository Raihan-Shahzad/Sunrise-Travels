"use client";
import { Button } from "@/app/(components)/ui/button";
import { Input } from "@/app/(components)/ui/input";
import { Textarea } from "@/app/(components)/ui/textarea";

export default function ContactForm() {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
      <h3 className="font-heading text-2xl font-bold mb-6 text-slate-900">Send us a Message</h3>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-2 gap-4">
          <Input placeholder="First Name" />
          <Input placeholder="Last Name" />
        </div>
        <Input type="email" placeholder="Email Address" />
        <Input type="tel" placeholder="Phone Number" />
        <Input placeholder="Subject" />
        <Textarea placeholder="How can we help you?" className="min-h-[120px]" />
        <Button className="w-full h-12 text-lg">Send Message</Button>
      </form>
    </div>
  );
}
