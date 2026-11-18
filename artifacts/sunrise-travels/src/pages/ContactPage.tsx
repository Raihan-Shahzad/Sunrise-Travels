import ContactForm from "@/components/forms/ContactForm";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { PHONE, PHONE_INTL, WHATSAPP_NUMBER, EMAIL } from "@/lib/site-config";
import PageHero from "@/components/PageHero";

export default function ContactPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <PageHero
        eyebrow="Visit or call"
        title="Get in Touch"
        subtitle="Our travel experts are ready to assist you. Call us, drop a message, or visit our Luton office."
        image="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2000&auto=format&fit=crop"
        imagePosition="center 45%"
      />

      <section className="py-16 container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="font-heading text-3xl font-bold mb-6 text-slate-900">Contact Information</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Whether you need a quick quote for a flight to Pakistan, or detailed consultation for your Hajj pilgrimage, we're here to help.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center text-center hover:border-primary transition-colors group">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Phone</h3>
                <a href={`tel:${PHONE_INTL}`} className="text-primary hover:underline">{PHONE}</a>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center text-center hover:border-[#25D366] transition-colors group">
                <div className="w-12 h-12 bg-[#25D366]/10 rounded-full flex items-center justify-center text-[#25D366] mb-4 group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">WhatsApp</h3>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="text-[#25D366] hover:underline">Chat with us</a>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center text-center hover:border-primary transition-colors group sm:col-span-2">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Office Address</h3>
                <p className="text-slate-600">211A Dunstable Road<br />Luton, Bedfordshire<br />LU1 1DD, United Kingdom</p>
              </div>
            </div>

            <div className="bg-slate-900 text-white p-8 rounded-2xl">
              <div className="flex items-center gap-4 mb-6">
                <Clock className="w-8 h-8 text-accent" />
                <h3 className="font-heading text-2xl font-bold">Business Hours</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex justify-between border-b border-slate-700 pb-2">
                  <span className="text-slate-300">Monday - Friday</span>
                  <span className="font-medium">10:00 AM - 6:00 PM</span>
                </li>
                <li className="flex justify-between border-b border-slate-700 pb-2">
                  <span className="text-slate-300">Saturday</span>
                  <span className="font-medium">10:00 AM - 2:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-slate-300">Sunday</span>
                  <span className="font-medium text-accent">Closed</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Form */}
          <div>
            <ContactForm />
          </div>
        </div>

        {/* Map */}
        <div className="mt-16 max-w-6xl mx-auto rounded-2xl overflow-hidden h-[400px] shadow-sm border border-slate-200">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2449.6234399710385!2d-0.4326553232049876!3d51.884241671900134!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487648f5726ccba5%3A0x7d6a5c2d3bc9dc7b!2s211A%20Dunstable%20Rd%2C%20Luton%20LU1%201DD%2C%20UK!5e0!3m2!1sen!2sus!4v1718912345678!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </div>
  );
}
