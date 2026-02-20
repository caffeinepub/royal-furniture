import { useState } from 'react';
import { useAddReview } from '../../hooks/useQueries';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Star } from 'lucide-react';
import { toast } from 'sonner';

interface AddReviewFormProps {
  productId: string;
}

export default function AddReviewForm({ productId }: AddReviewFormProps) {
  const { identity } = useInternetIdentity();
  const addReview = useAddReview();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const isAuthenticated = !!identity;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error('Please login to add a review');
      return;
    }

    if (!comment.trim()) {
      toast.error('Please write a comment');
      return;
    }

    try {
      await addReview.mutateAsync({ productId, rating: BigInt(rating), comment: comment.trim() });
      toast.success('Review added successfully!');
      setComment('');
      setRating(5);
    } catch (error) {
      console.error('Error adding review:', error);
      toast.error('Failed to add review');
    }
  };

  return (
    <div className="rounded-lg border border-gold-200/30 bg-white p-6">
      <h3 className="mb-4 font-montserrat text-xl font-semibold text-luxury-dark">Write a Review</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Rating</Label>
          <div className="mt-2 flex space-x-1">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`h-8 w-8 ${value <= rating ? 'fill-gold-500 text-gold-500' : 'text-gray-300'}`}
                />
              </button>
            ))}
          </div>
        </div>
        <div>
          <Label htmlFor="comment">Your Review</Label>
          <Textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with this product..."
            rows={4}
            required
          />
        </div>
        <Button
          type="submit"
          disabled={!isAuthenticated || addReview.isPending}
          className="w-full bg-gold-600 hover:bg-gold-700"
        >
          {addReview.isPending ? 'Submitting...' : isAuthenticated ? 'Submit Review' : 'Login to Review'}
        </Button>
      </form>
    </div>
  );
}
