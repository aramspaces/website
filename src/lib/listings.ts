import { useEffect, useState } from 'react';
import { supabase } from './supabase';
import { LISTINGS as FALLBACK_LISTINGS } from '../constants';

export type Listing = {
  id: number | string;
  title: string;
  slug?: string;
  city?: string;
  location: string;
  price: number;
  rating: number;
  reviewCount?: number;
  image: string;
  gallery: string[];
  description: string;
  amenities: string[];
  featured?: boolean;
  details: {
    guests: number;
    bedrooms: number;
    beds: number;
    baths: number | string;
  };
};

type UseListingsResult = {
  listings: Listing[];
  loading: boolean;
  error: string | null;
  usingFallback: boolean;
};

const asArray = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.filter(Boolean).map(String);
  }

  if (typeof value === 'string') {
    const trimmed = value.trim();

    if (!trimmed) {
      return [];
    }

    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed.filter(Boolean).map(String);
      }
    } catch {
      return trimmed
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
    }

    return [];
  }

  return [];
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

const pickFirstString = (values: unknown[], fallback = ''): string => {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) {
      return value;
    }
  }

  return fallback;
};

const asId = (value: unknown): string | number => {
  if (typeof value === 'string' || typeof value === 'number') {
    return value;
  }

  return crypto.randomUUID();
};

const mapSupabaseListing = (row: Record<string, unknown>): Listing => {
  const galleryImages = asArray(row.gallery_images);
  const amenities = asArray(row.amenities);

  const image = pickFirstString([row.cover_image, galleryImages[0]]);
  const gallery = image
    ? [image, ...galleryImages.filter((item) => item && item !== image)]
    : galleryImages.filter(Boolean);

  return {
    id: asId(row.id),
    title: pickFirstString([row.title], 'Untitled listing'),
    slug: pickFirstString([row.slug]),
    city: pickFirstString([row.city]),
    location: pickFirstString([row.location, row.city], 'Location coming soon'),
    price: asNumber(row.price_per_night, 0),
    rating: asNumber(row.rating, 0),
    reviewCount: asNumber(row.review_count, 0),
    image,
    gallery,
    description: pickFirstString([row.description], 'Listing description coming soon.'),
    amenities,
    featured: Boolean(row.featured),
    details: {
      guests: asNumber(row.guests, 0),
      bedrooms: asNumber(row.bedrooms, 0),
      beds: asNumber(row.bedrooms, 0),
      baths: asNumber(row.bathrooms, 0),
    },
  };
};

export const useListings = (): UseListingsResult => {
  const [listings, setListings] = useState<Listing[]>(FALLBACK_LISTINGS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(true);

  useEffect(() => {
    let isActive = true;

    const loadListings = async () => {
      setLoading(true);

      const { data, error: fetchError } = await supabase
        .from('listings')
        .select('*')
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (!isActive) {
        return;
      }

      if (fetchError) {
        setError(fetchError.message);
        setUsingFallback(true);
        setListings(FALLBACK_LISTINGS);
        setLoading(false);
        return;
      }

      if (data && data.length > 0) {
        setListings(data.map((row) => mapSupabaseListing(row as Record<string, unknown>)));
        setUsingFallback(false);
        setError(null);
      } else {
        setListings(FALLBACK_LISTINGS);
        setUsingFallback(true);
        setError(null);
      }

      setLoading(false);
    };

    loadListings();

    return () => {
      isActive = false;
    };
  }, []);

  return { listings, loading, error, usingFallback };
};
