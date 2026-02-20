import { Award, Users, Sparkles, DollarSign } from 'lucide-react';

export default function WhyChooseUsSection() {
  const features = [
    {
      icon: Award,
      title: 'Premium Quality Craftsmanship',
      description: 'Each piece is meticulously crafted using the finest materials and traditional techniques.',
    },
    {
      icon: Sparkles,
      title: 'Extensive Collection',
      description: 'From classic to contemporary, discover furniture that matches your unique style.',
    },
    {
      icon: Users,
      title: 'Expert Consultation',
      description: 'Our experienced team helps you find the perfect pieces for your space.',
    },
    {
      icon: DollarSign,
      title: 'Affordable Luxury',
      description: 'Premium quality at competitive prices, making luxury accessible to all.',
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="font-playfair text-4xl font-bold text-luxury-dark md:text-5xl">Why Choose Us</h2>
          <p className="mt-4 text-lg text-luxury-dark/70">Experience the Royal Furniture difference</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group rounded-lg border border-gold-200/30 bg-beige-50 p-8 text-center transition-all hover:border-gold-400 hover:shadow-lg"
            >
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gold-100 text-gold-600 transition-colors group-hover:bg-gold-600 group-hover:text-white">
                <feature.icon className="h-8 w-8" />
              </div>
              <h3 className="mb-3 font-montserrat text-xl font-semibold text-luxury-dark">{feature.title}</h3>
              <p className="text-sm text-luxury-dark/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
