import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface PriceRangeFilterProps {
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
}

export default function PriceRangeFilter({ priceRange, onPriceRangeChange }: PriceRangeFilterProps) {
  const [min, setMin] = useState(priceRange[0].toString());
  const [max, setMax] = useState(priceRange[1].toString());

  const handleApply = () => {
    const minValue = parseInt(min) || 0;
    const maxValue = parseInt(max) || 1000000;
    onPriceRangeChange([minValue, maxValue]);
  };

  const handleReset = () => {
    setMin('0');
    setMax('1000000');
    onPriceRangeChange([0, 1000000]);
  };

  return (
    <div className="rounded-lg border border-gold-200/30 bg-white p-6">
      <h3 className="mb-4 font-montserrat text-lg font-semibold text-luxury-dark">Price Range</h3>
      <div className="space-y-4">
        <div>
          <Label htmlFor="min-price">Min Price (₹)</Label>
          <Input
            id="min-price"
            type="number"
            value={min}
            onChange={(e) => setMin(e.target.value)}
            placeholder="0"
          />
        </div>
        <div>
          <Label htmlFor="max-price">Max Price (₹)</Label>
          <Input
            id="max-price"
            type="number"
            value={max}
            onChange={(e) => setMax(e.target.value)}
            placeholder="1000000"
          />
        </div>
        <div className="flex space-x-2">
          <Button onClick={handleApply} className="flex-1 bg-gold-600 hover:bg-gold-700">
            Apply
          </Button>
          <Button onClick={handleReset} variant="outline" className="flex-1">
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
