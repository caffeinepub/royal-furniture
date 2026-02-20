import { Link, useNavigate } from '@tanstack/react-router';
import { ShoppingCart, Heart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useGetCallerUserProfile, useGetCart, useGetWishlist } from '../../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import CartDrawer from '../cart/CartDrawer';
import LoginButton from '../auth/LoginButton';

export default function Header() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { data: userProfile } = useGetCallerUserProfile();
  const { data: cart = [] } = useGetCart();
  const { data: wishlist = [] } = useGetWishlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const isAuthenticated = !!identity;
  const cartItemCount = cart.length;
  const wishlistItemCount = wishlist.length;

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gold-200/20 bg-beige-50/95 backdrop-blur supports-[backdrop-filter]:bg-beige-50/80">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 transition-transform hover:scale-105">
            <img src="/assets/generated/logo.dim_400x400.png" alt="Royal Furniture" className="h-12 w-12" />
            <div className="flex flex-col">
              <span className="font-playfair text-2xl font-bold text-gold-700">Royal Furniture</span>
              <span className="text-xs text-gold-600">Luxury That Defines Your Living</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="font-montserrat text-sm font-medium text-luxury-dark transition-all duration-300 hover:text-gold-600 hover:scale-105"
                activeProps={{ className: 'text-gold-600 font-semibold' }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {isAuthenticated && userProfile && (
              <span className="hidden text-sm text-luxury-dark lg:inline">
                Welcome, <span className="font-semibold text-gold-600">{userProfile.name}</span>
              </span>
            )}

            {isAuthenticated && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative text-luxury-dark transition-all duration-300 hover:text-gold-600 hover:scale-110"
                  onClick={() => navigate({ to: '/wishlist' })}
                >
                  <Heart className="h-5 w-5" />
                  {wishlistItemCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold-600 text-xs font-bold text-white shadow-md">
                      {wishlistItemCount}
                    </span>
                  )}
                </Button>

                <Sheet open={cartOpen} onOpenChange={setCartOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative text-luxury-dark transition-all duration-300 hover:text-gold-600 hover:scale-110">
                      <ShoppingCart className="h-5 w-5" />
                      {cartItemCount > 0 && (
                        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold-600 text-xs font-bold text-white shadow-md">
                          {cartItemCount}
                        </span>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-full sm:max-w-lg">
                    <CartDrawer onClose={() => setCartOpen(false)} />
                  </SheetContent>
                </Sheet>
              </>
            )}

            <LoginButton />

            {/* Mobile Menu Toggle */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <nav className="flex flex-col space-y-4 pt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="text-lg font-medium text-luxury-dark transition-colors hover:text-gold-600"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
