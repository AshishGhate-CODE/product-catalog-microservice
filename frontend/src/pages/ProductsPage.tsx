import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Search, Filter, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Layout } from '@/components/layout/Layout';
import { ProductCard } from '@/components/product/ProductCard';
import { productAPI } from '@/lib/api';
import { Product } from '@/types/product';

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Get current filters from URL
  const currentSearch = searchParams.get('search') || '';
  const currentCategory = searchParams.get('category') || '';
  const currentSort = searchParams.get('sort') || '';
  const currentPage = parseInt(searchParams.get('page') || '1');

  const [localSearch, setLocalSearch] = useState(currentSearch);

  // Fetch products
  const { data: productsData, isLoading, error } = useQuery({
    queryKey: ['products', currentSearch, currentCategory, currentSort, currentPage],
    queryFn: () => productAPI.getProducts({
      page: currentPage - 1, // Backend expects 0-based
      size: 12,
      search: currentSearch || undefined,
      category: currentCategory || undefined,
      sortBy: currentSort ? currentSort.split(',')[0] : undefined,
      sortDir: currentSort ? currentSort.split(',')[1] as 'asc' | 'desc' : undefined,
    }),
  });

  // Fetch categories
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: productAPI.getCategories,
  });

  const updateSearchParams = (key: string, value: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (value) {
      newSearchParams.set(key, value);
    } else {
      newSearchParams.delete(key);
    }
    // Reset page when filters change
    if (key !== 'page') {
      newSearchParams.delete('page');
    }
    setSearchParams(newSearchParams);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateSearchParams('search', localSearch);
  };

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="p-8 text-center">
              <h2 className="text-xl font-semibold mb-2">Unable to load products</h2>
              <p className="text-muted-foreground">
                Please check your connection and try again.
              </p>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Products</h1>
          
          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <form onSubmit={handleSearch} className="flex gap-2 flex-1 max-w-md">
              <Input
                type="search"
                placeholder="Search products..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon" variant="outline">
                <Search className="h-4 w-4" />
              </Button>
            </form>

            <div className="flex flex-wrap gap-2 items-center">
              {/* Category Filter */}
              <Select value={currentCategory} onValueChange={(value) => updateSearchParams('category', value)}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  {categories?.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={currentSort} onValueChange={(value) => updateSearchParams('sort', value)}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Default</SelectItem>
                  <SelectItem value="name,asc">Name (A-Z)</SelectItem>
                  <SelectItem value="name,desc">Name (Z-A)</SelectItem>
                  <SelectItem value="price,asc">Price (Low-High)</SelectItem>
                  <SelectItem value="price,desc">Price (High-Low)</SelectItem>
                </SelectContent>
              </Select>

              {/* View Mode */}
              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="h-96">
                <CardContent className="p-4">
                  <div className="animate-pulse space-y-4">
                    <div className="bg-muted h-48 rounded"></div>
                    <div className="space-y-2">
                      <div className="bg-muted h-4 rounded w-3/4"></div>
                      <div className="bg-muted h-4 rounded w-1/2"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <>
            {productsData && productsData.content.length > 0 ? (
              <>
                <div className="mb-4 text-sm text-muted-foreground">
                  Showing {productsData.content.length} of {productsData.totalElements} products
                </div>
                
                <div className={
                  viewMode === 'grid' 
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
                    : "space-y-4"
                }>
                  {productsData.content.map((product: Product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {productsData.totalPages > 1 && (
                  <div className="mt-8 flex justify-center gap-2">
                    <Button
                      variant="outline"
                      disabled={currentPage <= 1}
                      onClick={() => updateSearchParams('page', String(currentPage - 1))}
                    >
                      Previous
                    </Button>
                    
                    {Array.from({ length: Math.min(5, productsData.totalPages) }, (_, i) => {
                      const pageNum = currentPage <= 3 
                        ? i + 1 
                        : currentPage + i - 2;
                      
                      if (pageNum > productsData.totalPages) return null;
                      
                      return (
                        <Button
                          key={pageNum}
                          variant={currentPage === pageNum ? 'default' : 'outline'}
                          onClick={() => updateSearchParams('page', String(pageNum))}
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                    
                    <Button
                      variant="outline"
                      disabled={currentPage >= productsData.totalPages}
                      onClick={() => updateSearchParams('page', String(currentPage + 1))}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <h2 className="text-xl font-semibold mb-2">No products found</h2>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search or filters
                  </p>
                  <Button onClick={() => setSearchParams({})}>
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default ProductsPage;