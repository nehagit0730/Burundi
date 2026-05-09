export type UserRole = 'admin' | 'client';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  role: UserRole;
  createdAt: any;
  updatedAt: any;
}

export type PropertyStatus = 'pending' | 'approved' | 'rejected';
export type PropertyType = 'house' | 'land' | 'commercial' | 'rental';
export type VerifiedStatus = 'Not Verified' | 'Verified' | 'Fully Verified';

export interface PropertyListing {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: 'BIF' | 'USD';
  location: string;
  type: PropertyType;
  status: PropertyStatus;
  rejectionReason?: string;
  images: string[];
  ownerId: string;
  ownerName: string;
  verifiedStatus: VerifiedStatus;
  createdAt: any;
  updatedAt: any;
}

export interface WebPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  isHome: boolean;
  updatedAt: any;
}
