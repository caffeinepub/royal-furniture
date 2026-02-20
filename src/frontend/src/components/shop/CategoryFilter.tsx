import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface CategoryFilterProps {
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
}

export default function CategoryFilter({ selectedCategories, onCategoryChange }: CategoryFilterProps) {
  const categories = [
    { value: 'sofa', label: 'Sofa' },
    { value: 'familySofa', label: 'Family Sofa' },
    { value: 'officeChair', label: 'Office Chair' },
    { value: 'tables', label: 'Tables' },
    { value: 'beds', label: 'Beds' },
    { value: 'diningSets', label: 'Dining Sets' },
  ];

  const handleToggle = (value: string) => {
    if (selectedCategories.includes(value)) {
      onCategoryChange(selectedCategories.filter((c) => c !== value));
    } else {
      onCategoryChange([...selectedCategories, value]);
    }
  };

  return (
    <div className="rounded-lg border border-gold-200/30 bg-white p-6">
      <h3 className="mb-4 font-montserrat text-lg font-semibold text-luxury-dark">Categories</h3>
      <div className="space-y-3">
        {categories.map((category) => (
          <div key={category.value} className="flex items-center space-x-2">
            <Checkbox
              id={category.value}
              checked={selectedCategories.includes(category.value)}
              onCheckedChange={() => handleToggle(category.value)}
            />
            <Label htmlFor={category.value} className="cursor-pointer text-luxury-dark/80">
              {category.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}
