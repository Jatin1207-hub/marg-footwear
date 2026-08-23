import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { useCart, selectTotal } from "@/lib/cart-store";
import { formatINR } from "@/lib/products";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import confetti from "canvas-confetti";
import { LogoMark } from "@/components/Logo";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [
    { title: "Checkout — Marg" },
    { name: "description", content: "Complete your Marg order." },
  ] }),
  component: Checkout,
});

const steps = ["Cart", "Address", "Payment", "Confirmation"] as const;

function Checkout() {
  const { items, clear } = useCart();
  const total = selectTotal(items);
  const shipping = total > 5000 || total === 0 ? 0 : 199;
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step === 3) {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 }, colors: ["#ff6a00", "#ffb347", "#ffffff"] });
    }
  }, [step]);

  return (
    <PageShell>
      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="flex items-center justify-between mb-10">
          {steps.map((s, i) => (
            <div key={s} className="flex-1 flex items-center">
              <div className={`flex items-center gap-2 ${i <= step ? "text-foreground" : "text-muted-foreground"}`}>
                <div className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold ${i < step ? "bg-neon text-neon-foreground" : i === step ? "border-2 border-neon" : "border border-border"}`}>
                  {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
                </div>
                <span className="text-xs tracking-wider hidden sm:inline">{s.toUpperCase()}</span>
              </div>
              {i < steps.length - 1 && <div className={`flex-1 h-px mx-2 ${i < step ? "bg-neon" : "bg-border"}`} />}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
            {step === 0 && (
              <div>
                <h2 className="text-2xl font-display font-bold mb-5">Review Bag</h2>
                {items.length === 0 ? (
                  <p className="text-muted-foreground">Your bag is empty. <Link to="/men" className="text-neon">Continue shopping</Link></p>
                ) : (
                  <>
                    <div className="space-y-3">
                      {items.map((i) => (
                        <div key={i.id} className="flex justify-between text-sm border border-border rounded-lg p-3">
                          <span>{i.name} × {i.qty}</span>
                          <span className="font-semibold">{formatINR(i.price * i.qty)}</span>
                        </div>
                      ))}
                    </div>
                    <Summary total={total} shipping={shipping} />
                    <button disabled={items.length === 0} onClick={() => setStep(1)} className="mt-6 w-full bg-neon text-neon-foreground font-semibold py-3 rounded-full disabled:opacity-50">Continue to Address</button>
                  </>
                )}
              </div>
            )}

            {step === 1 && (
              <form onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                <h2 className="text-2xl font-display font-bold mb-5">Shipping Address</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  <Input label="Full name" required />
                  <Input label="Phone" required type="tel" />
                  <Input label="Address" required className="sm:col-span-2" />
                  <Input label="City" required />
                  <Input label="PIN code" required />
                </div>
                <div className="mt-6 flex gap-3">
                  <button type="button" onClick={() => setStep(0)} className="flex-1 border border-border py-3 rounded-full">Back</button>
                  <button type="submit" className="flex-1 bg-neon text-neon-foreground font-semibold py-3 rounded-full">Continue to Payment</button>
                </div>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={(e) => { e.preventDefault(); clear(); setStep(3); }}>
                <h2 className="text-2xl font-display font-bold mb-5">Payment</h2>
                <div className="space-y-3">
                  <Input label="Card number" required placeholder="4242 4242 4242 4242" />
                  <div className="grid grid-cols-2 gap-3">
                    <Input label="Expiry" required placeholder="MM/YY" />
                    <Input label="CVC" required placeholder="123" />
                  </div>
                  <Input label="Name on card" required />
                </div>
                <Summary total={total} shipping={shipping} />
                <div className="mt-6 flex gap-3">
                  <button type="button" onClick={() => setStep(1)} className="flex-1 border border-border py-3 rounded-full">Back</button>
                  <button type="submit" className="flex-1 bg-neon text-neon-foreground font-semibold py-3 rounded-full">Pay {formatINR(total + shipping)}</button>
                </div>
              </form>
            )}

            {step === 3 && (
              <div className="text-center py-10">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} className="inline-flex">
                  <LogoMark className="h-20 w-20" glow />
                </motion.div>
                <h2 className="mt-6 text-4xl font-display font-bold">Order confirmed.</h2>
                <p className="mt-3 text-muted-foreground">Welcome to the Marg family. Your gear is on its way.</p>
                <Link to="/" className="mt-8 inline-block bg-neon text-neon-foreground font-semibold px-7 py-3 rounded-full">Back to home</Link>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </PageShell>
  );
}

function Summary({ total, shipping }: { total: number; shipping: number }) {
  return (
    <div className="mt-5 border-t border-border pt-4 text-sm space-y-1">
      <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatINR(total)}</span></div>
      <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? "Free" : formatINR(shipping)}</span></div>
      <div className="flex justify-between font-semibold pt-2 text-base"><span>Total</span><span>{formatINR(total + shipping)}</span></div>
    </div>
  );
}

function Input({ label, className = "", ...props }: { label: string; className?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={`block ${className}`}>
      <span className="text-xs tracking-widest text-muted-foreground">{label.toUpperCase()}</span>
      <input {...props} className="mt-1 w-full min-h-[44px] bg-transparent border border-border rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-neon" />
    </label>
  );
}
