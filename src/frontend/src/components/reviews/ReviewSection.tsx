import { Star } from 'lucide-react';
import type { Review } from '../../backend';
import { useGetUserProfile } from '../../hooks/useQueries';

interface ReviewSectionProps {
  reviews: Review[];
}

function ReviewItem({ review }: { review: Review }) {
  const { data: userProfile } = useGetUserProfile(review.userId.toString());

  return (
    <div className="rounded-lg border border-gold-200/30 bg-white p-6">
      <div className="mb-3 flex items-center space-x-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < Number(review.rating) ? 'fill-gold-500 text-gold-500' : 'text-gray-300'}`}
          />
        ))}
      </div>
      <p className="mb-3 text-luxury-dark/80">{review.comment}</p>
      <div className="flex items-center justify-between text-sm text-luxury-dark/60">
        <span className="font-semibold">{userProfile?.name || 'Anonymous'}</span>
        <span>{new Date(Number(review.createdAt) / 1000000).toLocaleDateString()}</span>
      </div>
    </div>
  );
}

export default function ReviewSection({ reviews }: ReviewSectionProps) {
  if (reviews.length === 0) {
    return (
      <div className="rounded-lg border border-gold-200/30 bg-beige-50 p-8 text-center">
        <p className="text-luxury-dark/60">No reviews yet. Be the first to review this product!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review, index) => (
        <ReviewItem key={index} review={review} />
      ))}
    </div>
  );
}
