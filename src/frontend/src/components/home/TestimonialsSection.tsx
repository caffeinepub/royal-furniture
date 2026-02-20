import { Star, Quote } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Priya Sharma',
      rating: 5,
      comment: 'Absolutely love the quality and design! The sofa set transformed our living room into a luxurious space.',
    },
    {
      name: 'Rajesh Kumar',
      rating: 5,
      comment: 'Excellent service and premium furniture. The dining set exceeded our expectations in every way.',
    },
    {
      name: 'Anita Devi',
      rating: 5,
      comment: 'Beautiful craftsmanship and attention to detail. Royal Furniture is truly the best in Guwahati!',
    },
  ];

  return (
    <section className="bg-gradient-to-b from-beige-50 to-beige-100 py-24">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="font-playfair text-5xl font-bold text-luxury-dark md:text-6xl">
            What Our Customers Say
          </h2>
          <p className="mt-6 text-xl text-luxury-dark/70">
            Real experiences from our valued customers
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl border-2 border-gold-200/30 bg-white p-8 shadow-luxury transition-all duration-300 hover:border-gold-400 hover:shadow-luxury-lg hover:scale-[1.02]"
            >
              {/* Decorative Quote Icon */}
              <div className="absolute -right-4 -top-4 opacity-10 transition-opacity duration-300 group-hover:opacity-20">
                <Quote className="h-32 w-32 text-gold-600" />
              </div>

              <div className="relative z-10">
                {/* Rating Stars */}
                <div className="mb-6 flex items-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-gold-500 text-gold-500" />
                  ))}
                </div>

                {/* Comment */}
                <p className="mb-6 font-montserrat text-lg italic leading-relaxed text-luxury-dark/80">
                  "{testimonial.comment}"
                </p>

                {/* Customer Name */}
                <div className="border-t border-gold-200/30 pt-4">
                  <p className="font-playfair text-xl font-semibold text-luxury-dark">
                    {testimonial.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
