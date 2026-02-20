import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/assets/generated/hero-luxury.dim_1920x1080.png"
          alt="Luxury Furniture"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-luxury-dark/80 via-luxury-dark/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl space-y-8 hero-content">
            <h1 className="font-playfair text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
              Luxury That Defines
              <span className="block text-gold-400">Your Living</span>
            </h1>
            <p className="text-xl text-white/90 md:text-2xl">
              Discover exquisite furniture crafted with precision and elegance for your dream home
            </p>
            <Button
              size="lg"
              onClick={() => navigate({ to: '/shop' })}
              className="group relative overflow-hidden bg-gold-600 px-8 py-6 text-lg font-semibold text-white transition-all duration-300 hover:bg-gold-700 hover:scale-105 hover:shadow-luxury"
            >
              <span className="relative z-10">Explore Collection</span>
              <div className="absolute inset-0 -z-0 bg-gradient-to-r from-gold-500 to-gold-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
