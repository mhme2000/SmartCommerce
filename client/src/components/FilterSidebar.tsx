import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useProducts } from '@/hooks/useProducts';

export const FilterSidebar: React.FC = () => {
  const { filters, updateFilters, clearFilters, availableBrands, availableCategories } = useProducts();

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      updateFilters({ categories: [...filters.categories, category] });
    } else {
      updateFilters({ categories: filters.categories.filter(c => c !== category) });
    }
  };

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      updateFilters({ brands: [...filters.brands, brand] });
    } else {
      updateFilters({ brands: filters.brands.filter(b => b !== brand) });
    }
  };

  const handlePriceRangeChange = (range: string) => {
    switch (range) {
      case 'all':
        updateFilters({ priceRange: { min: 0, max: 5000 } });
        break;
      case '0-1000':
        updateFilters({ priceRange: { min: 0, max: 1000 } });
        break;
      case '1000-1500':
        updateFilters({ priceRange: { min: 1000, max: 1500 } });
        break;
      case '1500-2000':
        updateFilters({ priceRange: { min: 1500, max: 2000 } });
        break;
      case '2000+':
        updateFilters({ priceRange: { min: 2000, max: 5000 } });
        break;
    }
  };

  const getCurrentPriceRange = () => {
    const { min, max } = filters.priceRange;
    if (min === 0 && max === 5000) return 'all';
    if (min === 0 && max === 1000) return '0-1000';
    if (min === 1000 && max === 1500) return '1000-1500';
    if (min === 1500 && max === 2000) return '1500-2000';
    if (min === 2000 && max === 5000) return '2000+';
    return 'all';
  };

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>Filtros</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        <div>
          <h4 className="font-medium text-slate-700 mb-3">Categoria</h4>
          <div className="space-y-2">
            {availableCategories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={filters.categories.includes(category)}
                  onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                />
                <Label htmlFor={`category-${category}`} className="text-sm">
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>

        
        <div>
          <h4 className="font-medium text-slate-700 mb-3">Faixa de Preço</h4>
          <RadioGroup value={getCurrentPriceRange()} onValueChange={handlePriceRangeChange}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="price-all" />
              <Label htmlFor="price-all" className="text-sm">Todos os preços</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="0-1000" id="price-0-1000" />
              <Label htmlFor="price-0-1000" className="text-sm">Até R$ 1.000</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1000-1500" id="price-1000-1500" />
              <Label htmlFor="price-1000-1500" className="text-sm">R$ 1.000 - R$ 1.500</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1500-2000" id="price-1500-2000" />
              <Label htmlFor="price-1500-2000" className="text-sm">R$ 1.500 - R$ 2.000</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="2000+" id="price-2000+" />
              <Label htmlFor="price-2000+" className="text-sm">Acima de R$ 2.000</Label>
            </div>
          </RadioGroup>
        </div>

        
        <div>
          <h4 className="font-medium text-slate-700 mb-3">Marca</h4>
          <div className="space-y-2">
            {availableBrands.map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox
                  id={`brand-${brand}`}
                  checked={filters.brands.includes(brand)}
                  onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
                />
                <Label htmlFor={`brand-${brand}`} className="text-sm">
                  {brand}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Button variant="outline" onClick={clearFilters} className="w-full">
          Limpar Filtros
        </Button>
      </CardContent>
    </Card>
  );
};
