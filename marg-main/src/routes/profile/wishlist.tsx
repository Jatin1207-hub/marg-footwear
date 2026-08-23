import { createFileRoute, Link } from "@tanstack/react-router";
import { useAuthStore } from "../../lib/auth-store";
import { useCart } from "../../lib/cart-store";
import { Heart, HeartOff, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/profile/wishlist")({
  component: WishlistPage,
});

function WishlistPage() {
  const { user, toggleWishlist } = useAuthStore();
  const addItem = useCart(s => s.addItem);
  const openCart = useCart(s => s.open);
  
  if (!user) return null;

  const handleRemove = (item: any) => {
    toggleWishlist(item);
    toast.success("Removed from wishlist");
  };

  const handleAddToCart = (item: any) => {
    addItem({
      id: item.productId,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
      sub: "Mens Shoes" // Mock sub category
    });
    toast.success("Added to cart");
    openCart();
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div>
        <h1 className="text-2xl font-display font-semibold mb-1">Wishlist</h1>
        <p className="text-sm text-muted-foreground">Your saved items for later.</p>
      </div>

      {user.wishlist.length === 0 ? (
        <div className="bg-[#0e0e0d] border border-[#2a2a28] rounded-xl p-12 flex flex-col items-center justify-center text-center shadow-lg">
          <div className="w-16 h-16 bg-[#141413] rounded-full flex items-center justify-center mb-4">
            <Heart className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-1">Your wishlist is empty</h3>
          <p className="text-sm text-muted-foreground max-w-sm mb-6">Save your favorite styles here so you can easily find them later.</p>
          <Link to="/new-arrivals" className="bg-neon text-neon-foreground px-6 py-3 rounded-full font-medium hover:bg-neon/90 transition-colors">
            Explore Collection
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {user.wishlist.map((item) => (
            <div key={item.productId} className="bg-[#0e0e0d] border border-[#2a2a28] rounded-xl overflow-hidden shadow-lg flex flex-col group relative">
              <Link to="/product/$id" params={{ id: item.productId }} className="block aspect-[4/3] bg-[#1a1a18] overflow-hidden relative">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </Link>
              
              <div className="p-4 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2 gap-4">
                  <Link to="/product/$id" params={{ id: item.productId }} className="font-medium hover:text-neon transition-colors line-clamp-2">
                    {item.name}
                  </Link>
                  <span className="font-display font-semibold">${item.price.toFixed(2)}</span>
                </div>

                <div className="mt-auto pt-4 flex gap-2">
                  <button 
                    onClick={() => handleRemove(item)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-[#141413] hover:bg-[#222] border border-[#2a2a28] rounded-md text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <HeartOff size={16} />
                    Remove
                  </button>
                  <button 
                    onClick={() => handleAddToCart(item)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-neon text-neon-foreground hover:bg-neon/90 rounded-md text-sm font-medium transition-colors"
                  >
                    <ShoppingBag size={16} />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
