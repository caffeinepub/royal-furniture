import ContactForm from '../components/contact/ContactForm';
import { MapPin, Phone, Clock } from 'lucide-react';
import ProfileSetupModal from '../components/auth/ProfileSetupModal';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white py-12">
      <ProfileSetupModal />
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="mb-4 font-playfair text-5xl font-bold text-luxury-dark">Contact Us</h1>
          <p className="text-lg text-luxury-dark/70">We'd love to hear from you. Get in touch with us today!</p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <div>
            <h2 className="mb-6 font-playfair text-3xl font-bold text-luxury-dark">Send us a Message</h2>
            <ContactForm />
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="mb-6 font-playfair text-3xl font-bold text-luxury-dark">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gold-100">
                    <Phone className="h-6 w-6 text-gold-600" />
                  </div>
                  <div>
                    <h3 className="mb-2 font-montserrat text-xl font-semibold text-luxury-dark">Phone</h3>
                    <a
                      href="tel:+919864074530"
                      className="text-lg text-gold-600 transition-colors hover:text-gold-700"
                    >
                      +91 9864074530
                    </a>
                    <p className="mt-1 text-sm text-luxury-dark/60">Click to call on mobile devices</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gold-100">
                    <Clock className="h-6 w-6 text-gold-600" />
                  </div>
                  <div>
                    <h3 className="mb-2 font-montserrat text-xl font-semibold text-luxury-dark">Business Hours</h3>
                    <p className="text-lg text-luxury-dark/80">Open 7 days a week</p>
                    <p className="text-lg text-luxury-dark/80">9:00 AM - 8:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gold-100">
                    <MapPin className="h-6 w-6 text-gold-600" />
                  </div>
                  <div>
                    <h3 className="mb-2 font-montserrat text-xl font-semibold text-luxury-dark">Address</h3>
                    <p className="text-lg text-luxury-dark/80">
                      Royal View Building<br />
                      Dr BK Kakati Rd, Ulubari<br />
                      Guwahati, Assam 781007<br />
                      India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div>
              <h3 className="mb-4 font-montserrat text-xl font-semibold text-luxury-dark">Find Us</h3>
              <div className="h-[400px] overflow-hidden rounded-lg shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3581.7234567890123!2d91.7898765!3d26.1849321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDExJzA1LjgiTiA5McKwNDcnMjMuNiJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Royal Furniture Location"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
