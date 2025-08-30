import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { X } from 'lucide-react';
import { useFilterStore } from '@/stores/useFilterStore';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export const FilterBar = () => {
  const { selectedCategory, setSelectedCategory, clearFilters, searchTerm } = useFilterStore();

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: api.getCategories,
  });

  const hasActiveFilters = selectedCategory || searchTerm;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-muted/50 rounded-lg border">
      <div className="flex items-center gap-4 flex-1">
        <span className="text-sm font-medium whitespace-nowrap">Filter by:</span>
        
        <Select value={selectedCategory || undefined} onValueChange={(value) => setSelectedCategory(value || '')}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category} className="capitalize">
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {hasActiveFilters && (
        <Button
          variant="outline"
          size="sm"
          onClick={clearFilters}
          className="flex items-center gap-1"
        >
          <X className="h-3 w-3" />
          Clear Filters
        </Button>
      )}
    </div>
  );
};