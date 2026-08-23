import { createFileRoute } from "@tanstack/react-router";
import { useAuthStore } from "../../lib/auth-store";
import { Package, Truck, ChevronRight } from "lucide-react";
import { format } from "date-fns";

export const Route = createFileRoute("/profile/orders")({
  component: OrdersPage,
});

function OrdersPage() {
  const { user } = useAuthStore();
  
  if (!user) return null;

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Delivered': return "bg-[#142e14] text-[#4ade80] border-[#1e4620]"; // subtle green
      case 'Processing': return "bg-[#332514] text-[#fbbf24] border-[#4d371e]"; // subtle amber
      case 'Shipped': return "bg-[#142533] text-[#60a5fa] border-[#1e384d]"; // subtle blue
      case 'Cancelled': return "bg-[#2e1414] text-[#f87171] border-[#461e1e]"; // subtle red
      default: return "bg-[#1a1a18] text-muted-foreground border-[#333]";
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div>
        <h1 className="text-2xl font-display font-semibold mb-1">My Orders</h1>
        <p className="text-sm text-muted-foreground">View and track your recent orders.</p>
      </div>

      <div className="space-y-4">
        {user.orders.length === 0 ? (
          <div className="bg-[#0e0e0d] border border-[#2a2a28] rounded-xl p-12 flex flex-col items-center justify-center text-center shadow-lg">
            <div className="w-16 h-16 bg-[#141413] rounded-full flex items-center justify-center mb-4">
              <Package className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-1">No orders yet</h3>
            <p className="text-sm text-muted-foreground max-w-sm">When you place an order, it will appear here so you can track its status.</p>
          </div>
        ) : (
          user.orders.map((order) => (
            <div key={order.id} className="bg-[#0e0e0d] border border-[#2a2a28] rounded-xl overflow-hidden shadow-lg">
              {/* Order Header */}
              <div className="bg-[#141413] border-b border-[#2a2a28] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-6 text-sm">
                  <div>
                    <div className="text-[11px] uppercase tracking-widest text-muted-foreground mb-1">Order Placed</div>
                    <div className="font-medium">{format(new Date(order.date), "MMM d, yyyy")}</div>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-widest text-muted-foreground mb-1">Total</div>
                    <div className="font-medium">${order.total.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-widest text-muted-foreground mb-1">Order #</div>
                    <div className="font-medium">{order.id}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-4 sm:p-6">
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-20 h-20 bg-[#1a1a18] rounded-lg overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <h4 className="font-medium text-sm sm:text-base truncate">{item.name}</h4>
                        <p className="text-muted-foreground text-xs mt-1">Qty: {item.quantity} | ${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Actions */}
              <div className="border-t border-[#2a2a28] p-4 flex flex-wrap gap-3">
                {order.status !== 'Cancelled' && order.status !== 'Delivered' && (
                  <button className="flex items-center justify-center gap-2 bg-neon text-neon-foreground hover:bg-neon/90 px-4 py-2 rounded-md text-sm font-medium transition-colors flex-1 sm:flex-none">
                    <Truck size={16} />
                    Track Order
                  </button>
                )}
                <button className="flex items-center justify-center gap-2 bg-[#1a1a18] text-foreground hover:bg-[#222] border border-[#333] hover:border-neon px-4 py-2 rounded-md text-sm font-medium transition-colors flex-1 sm:flex-none group">
                  View Details
                  <ChevronRight size={16} className="text-muted-foreground group-hover:text-neon" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
