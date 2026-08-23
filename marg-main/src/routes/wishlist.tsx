import { createFileRoute } from '@tanstack/react-router'
import { Heart } from 'lucide-react'

export const Route = createFileRoute('/wishlist')({
  component: Wishlist,
})

function Wishlist() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 pt-24 text-center">
      <div className="h-20 w-20 bg-secondary/50 rounded-full flex items-center justify-center mb-6">
        <Heart className="h-10 w-10 text-muted-foreground opacity-50" />
      </div>
      <h1 className="text-3xl font-display font-bold mb-4">Your wishlist is empty</h1>
      <p className="text-muted-foreground max-w-md mb-8">
        You haven't saved any items yet. Keep exploring to find your perfect pair of sneakers.
      </p>
      <a 
        href="/new-arrivals" 
        className="bg-neon text-neon-foreground px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
      >
        Explore Collection
      </a>
    </div>
  )
}
