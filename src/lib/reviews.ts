import { useEffect, useState } from 'react';
import { supabase } from './supabase';

const REVIEWS_TABLE = 'Guest_Reviews';

export type ReviewItem = {
  id: number | string;
  rating: number;
  guestName: string;
  review: string;
  stay: string;
};

type UseReviewsResult = {
  reviews: ReviewItem[];
  loading: boolean;
  error: string | null;
};

const asNumber = (value: unknown, fallback = 0): number => {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === 'string') {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return fallback;
};

const asString = (value: unknown, fallback = ''): string => {
  return typeof value === 'string' && value.trim() ? value : fallback;
};

const asId = (value: unknown): number | string => {
  if (typeof value === 'number' || typeof value === 'string') {
    return value;
  }

  return crypto.randomUUID();
};

const mapReview = (row: Record<string, unknown>): ReviewItem => ({
  id: asId(row.id),
  rating: Math.max(0, Math.min(5, asNumber(row.Rating, 0))),
  guestName: asString(row.Guest_Name, 'Guest'),
  review: asString(row.Review),
  stay: asString(row.Stay),
});

export const useReviews = (): UseReviewsResult => {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    const loadReviews = async () => {
      setLoading(true);

      const { data, error: fetchError } = await supabase
        .from(REVIEWS_TABLE)
        .select('*')
        .order('created_at', { ascending: false });

      if (!isActive) {
        return;
      }

      if (fetchError) {
        setError(fetchError.message);
        setReviews([]);
        setLoading(false);
        return;
      }

      const mapped = (data ?? [])
        .map((row) => mapReview(row as Record<string, unknown>))
        .filter((item) => item.review);

      setReviews(mapped);
      setError(null);
      setLoading(false);
    };

    loadReviews();

    return () => {
      isActive = false;
    };
  }, []);

  return { reviews, loading, error };
};
