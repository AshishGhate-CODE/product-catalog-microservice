import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types/product';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  return (
    <Link to={`/products/${product.id}`}>
      <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-product hover:-translate-y-1">
        <div className="aspect-square overflow-hidden bg-gradient-card">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-hero flex items-center justify-center">
              <div className="text-4xl font-bold text-primary/30">
                {product.name.charAt(0).toUpperCase()}
              </div>
            </div>
          )}
          {product.stock <= 5 && product.stock > 0 && (
            <Badge variant="secondary" className="absolute top-2 right-2">
              Low Stock
            </Badge>
          )}
          {product.stock === 0 && (
            <Badge variant="destructive" className="absolute top-2 right-2">
              Out of Stock
            </Badge>
          )}
        </div>
        
        <CardContent className="p-4">
          <div className="space-y-2">
            <Badge variant="outline" className="text-xs">
              {product.category}
            </Badge>
            <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {product.description}
            </p>
            
            {product.rating && (
              <div className="flex items-center space-x-1">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating || 0)
                          ? 'text-yellow-400 fill-current'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  ({product.rating.toFixed(1)})
                </span>
              </div>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0">
          <div className="flex items-center justify-between w-full">
            <div className="space-y-1">
              <p className="text-2xl font-bold text-price">
                ${product.price.toFixed(2)}
              </p>
              {product.brand && (
                <p className="text-xs text-muted-foreground">{product.brand}</p>
              )}
            </div>
            <Button
              size="sm"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="shrink-0"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};