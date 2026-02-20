import HeroSection from '../components/home/HeroSection';
import FeaturedProductsSection from '../components/home/FeaturedProductsSection';
import CategoriesSection from '../components/home/CategoriesSection';
import WhyChooseUsSection from '../components/home/WhyChooseUsSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import StoreInfoSection from '../components/home/StoreInfoSection';
import ProfileSetupModal from '../components/auth/ProfileSetupModal';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <ProfileSetupModal />
      <HeroSection />
      <div className="luxury-divider" />
      <FeaturedProductsSection />
      <div className="luxury-divider" />
      <CategoriesSection />
      <div className="luxury-divider" />
      <WhyChooseUsSection />
      <div className="luxury-divider" />
      <TestimonialsSection />
      <div className="luxury-divider" />
      <StoreInfoSection />
    </main>
  );
}
