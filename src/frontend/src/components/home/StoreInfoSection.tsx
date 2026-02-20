import { MapPin, Phone, Clock } from 'lucide-react';

export default function StoreInfoSection() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="font-playfair text-4xl font-bold text-luxury-dark md:text-5xl">Visit Our Showroom</h2>
          <p className="mt-4 text-lg text-luxury-dark/70">Experience luxury furniture in person</p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gold-100">
                <Clock className="h-6 w-6 text-gold-600" />
              </div>
              <div>
                <h3 className="mb-2 font-montserrat text-xl font-semibold text-luxury-dark">Store Hours</h3>
                <p className="text-luxury-dark/70">Open 7 days a week</p>
                <p className="text-luxury-dark/70">Monday - Sunday: 9:00 AM - 8:00 PM</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gold-100">
                <MapPin className="h-6 w-6 text-gold-600" />
              </div>
              <div>
                <h3 className="mb-2 font-montserrat text-xl font-semibold text-luxury-dark">Address</h3>
                <p className="text-luxury-dark/70">
                  Royal View Building, Dr BK Kakati Rd<br />
                  Ulubari, Guwahati, Assam 781007<br />
                  India
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gold-100">
                <Phone className="h-6 w-6 text-gold-600" />
              </div>
              <div>
                <h3 className="mb-2 font-montserrat text-xl font-semibold text-luxury-dark">Contact</h3>
                <a href="tel:+919864074530" className="text-gold-600 hover:text-gold-700">
                  +91 9864074530
                </a>
              </div>
            </div>
          </div>

          {/* Map */}
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
    </section>
  );
}
