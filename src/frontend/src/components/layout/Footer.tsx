import { Link } from '@tanstack/react-router';
import { SiFacebook } from 'react-icons/si';
import { Heart, Phone, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(window.location.hostname || 'royal-furniture');

  return (
    <footer className="border-t border-gold-200/20 bg-gradient-to-b from-beige-100 to-beige-200 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div>
            <div className="mb-4 flex items-center space-x-2">
              <img src="/assets/generated/logo.dim_400x400.png" alt="Royal Furniture" className="h-10 w-10" />
              <h3 className="font-playfair text-xl font-bold text-gold-700">Royal Furniture</h3>
            </div>
            <p className="text-sm leading-relaxed text-luxury-dark/70">
              Guwahati's premier destination for luxury furniture. We bring elegance and comfort to your living spaces with our curated collection of premium furniture.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-playfair text-lg font-semibold text-luxury-dark">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-luxury-dark/70 transition-colors hover:text-gold-600">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-sm text-luxury-dark/70 transition-colors hover:text-gold-600">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-luxury-dark/70 transition-colors hover:text-gold-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-luxury-dark/70 transition-colors hover:text-gold-600">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="mb-4 font-playfair text-lg font-semibold text-luxury-dark">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2 text-sm text-luxury-dark/70">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-600" />
                <span>Royal View Building, Dr BK Kakati Rd, Ulubari, Guwahati, Assam 781007</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-luxury-dark/70">
                <Phone className="h-4 w-4 flex-shrink-0 text-gold-600" />
                <a href="tel:+919864074530" className="transition-colors hover:text-gold-600">
                  +91 9864074530
                </a>
              </li>
              <li className="flex items-start space-x-2 text-sm text-luxury-dark/70">
                <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-600" />
                <span>Open 7 days a week<br />9:00 AM - 8:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="mb-4 font-playfair text-lg font-semibold text-luxury-dark">Follow Us</h4>
            <a
              href="https://www.facebook.com/royalfurnitureghy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-sm text-luxury-dark/70 transition-colors hover:text-gold-600"
            >
              <SiFacebook className="h-5 w-5" />
              <span>Facebook</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gold-200/20 pt-8 text-center">
          <p className="text-sm text-luxury-dark/60">
            © {currentYear} Royal Furniture. All rights reserved.
          </p>
          <p className="mt-2 text-sm text-luxury-dark/60">
            Built with <Heart className="inline h-4 w-4 text-gold-600 fill-gold-600" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-gold-600 transition-colors hover:text-gold-700"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
