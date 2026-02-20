import ProfileSetupModal from '../components/auth/ProfileSetupModal';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <ProfileSetupModal />
      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden bg-gradient-to-br from-beige-100 to-beige-200">
        <div className="absolute inset-0">
          <img
            src="/assets/generated/about-showroom.dim_1200x600.png"
            alt="Royal Furniture Showroom"
            className="h-full w-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-luxury-dark/70 to-transparent" />
        </div>
        <div className="container relative mx-auto flex h-full items-center px-4">
          <div className="max-w-2xl text-white">
            <h1 className="font-playfair text-5xl font-bold md:text-6xl">About Royal Furniture</h1>
            <p className="mt-4 text-xl text-beige-100">Crafting luxury living spaces since our inception</p>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 font-playfair text-4xl font-bold text-luxury-dark">Our Story</h2>
            <div className="space-y-6 text-lg text-luxury-dark/80">
              <p>
                Royal Furniture was born from a passion for creating exceptional living spaces that blend timeless elegance with modern comfort. Located in the heart of Guwahati at Royal View Building, we have established ourselves as the premier destination for luxury furniture in Assam.
              </p>
              <p>
                Our journey began with a simple vision: to bring world-class furniture craftsmanship to the homes of Guwahati. Every piece in our collection is carefully curated to meet the highest standards of quality, design, and durability. We believe that furniture is not just about functionality—it's about creating an atmosphere that reflects your personality and enhances your lifestyle.
              </p>
              <p>
                From luxurious sofas that invite relaxation to elegant dining sets that bring families together, each item in our showroom tells a story of meticulous craftsmanship and attention to detail. We work with skilled artisans and renowned manufacturers to ensure that every piece meets our exacting standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-beige-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div className="rounded-lg border border-gold-200/30 bg-white p-8">
              <h2 className="mb-6 font-playfair text-3xl font-bold text-gold-700">Our Mission</h2>
              <p className="text-lg text-luxury-dark/80">
                To provide our customers with premium quality furniture that combines exceptional craftsmanship, timeless design, and unparalleled comfort. We are committed to delivering personalized service and creating lasting relationships with every customer who walks through our doors.
              </p>
            </div>
            <div className="rounded-lg border border-gold-200/30 bg-white p-8">
              <h2 className="mb-6 font-playfair text-3xl font-bold text-gold-700">Our Vision</h2>
              <p className="text-lg text-luxury-dark/80">
                To be recognized as Guwahati's most trusted and preferred destination for luxury furniture, setting the standard for quality, design innovation, and customer satisfaction. We aspire to transform houses into homes, one beautiful piece at a time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Showroom Introduction */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-8 font-playfair text-4xl font-bold text-luxury-dark">Visit Our Showroom</h2>
            <p className="mb-6 text-lg text-luxury-dark/80">
              Experience the Royal Furniture difference in person at our expansive showroom in Ulubari, Guwahati. Spread across multiple floors, our showroom showcases an extensive collection of premium furniture across all categories.
            </p>
            <p className="mb-6 text-lg text-luxury-dark/80">
              Our knowledgeable staff is always ready to assist you in finding the perfect pieces for your home. Whether you're furnishing a single room or an entire house, we provide expert guidance on style, functionality, and space planning.
            </p>
            <div className="mt-12 rounded-lg border border-gold-200/30 bg-beige-50 p-8">
              <h3 className="mb-4 font-montserrat text-2xl font-semibold text-luxury-dark">Location</h3>
              <p className="mb-2 text-lg text-luxury-dark/80">Royal View Building, Dr BK Kakati Rd</p>
              <p className="mb-2 text-lg text-luxury-dark/80">Ulubari, Guwahati, Assam 781007</p>
              <p className="mb-4 text-lg text-luxury-dark/80">India</p>
              <p className="text-lg font-semibold text-gold-600">Open 7 days a week: 9:00 AM - 8:00 PM</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
