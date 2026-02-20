import { useNavigate } from '@tanstack/react-router';

export default function CategoriesSection() {
  const navigate = useNavigate();

  const categories = [
    { name: 'Sofa', image: '/assets/generated/category-sofa-luxury.dim_600x600.png', filter: 'sofa' },
    { name: 'Family Sofa', image: '/assets/generated/category-sofa-luxury.dim_600x600.png', filter: 'familySofa' },
    { name: 'Office Chair', image: '/assets/generated/category-office-luxury.dim_600x600.png', filter: 'officeChair' },
    { name: 'Tables', image: '/assets/generated/category-tables-luxury.dim_600x600.png', filter: 'tables' },
    { name: 'Beds', image: '/assets/generated/category-beds-luxury.dim_600x600.png', filter: 'beds' },
    { name: 'Dining Sets', image: '/assets/generated/category-dining-luxury.dim_600x600.png', filter: 'diningSets' },
  ];

  return (
    <section className="bg-beige-50 py-24">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="font-playfair text-5xl font-bold text-luxury-dark md:text-6xl">
            Shop by Category
          </h2>
          <p className="mt-6 text-xl text-luxury-dark/70">
            Explore our diverse range of premium furniture
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:gap-8">
          {categories.map((category) => (
            <div
              key={category.filter}
              onClick={() => navigate({ to: '/shop', search: { category: category.filter } })}
              className="group relative cursor-pointer overflow-hidden rounded-xl border-2 border-gold-200/30 shadow-luxury transition-all duration-500 hover:border-gold-400 hover:shadow-luxury-lg hover:scale-[1.02]"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:opacity-90"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark/90 via-luxury-dark/50 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-70" />
              <div className="absolute bottom-0 left-0 right-0 p-6 transition-transform duration-500 group-hover:translate-y-[-4px]">
                <h3 className="font-playfair text-2xl font-bold text-white md:text-3xl">
                  {category.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
