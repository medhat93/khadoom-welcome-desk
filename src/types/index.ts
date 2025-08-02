// User types
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'host' | 'guest' | 'admin';
  verified: boolean;
  nafathVerified?: boolean;
}

// Property types
export interface Property {
  id: string;
  hostId: string;
  name: string;
  description: string;
  type: 'apartment' | 'villa' | 'chalet';
  location: string;
  tourismLicense?: string;
  units: Unit[];
  createdAt: Date;
}

export interface Unit {
  id: string;
  propertyId: string;
  name: string;
  description?: string;
  depositAmount: number;
  terms: string;
  checkInLink: string;
  qrCode: string;
  status: 'available' | 'occupied' | 'maintenance';
  currentGuest?: Guest;
  availableFrom?: Date; // When unit will be available again
}

// Guest types
export interface Guest {
  id: string;
  unitId: string;
  name: string;
  email: string;
  phone: string;
  idNumber: string;
  companions: Companion[];
  checkInDate: Date;
  leavingDate?: Date;
  checkOutDate?: Date;
  registrationCard: RegistrationCard;
  deposit: Deposit;
  status: 'pending' | 'checked-in' | 'checked-out';
}

export interface Companion {
  name: string;
  idNumber: string;
  relationship: string;
}

export interface RegistrationCard {
  id: string;
  guestApproved: boolean;
  hostApproved: boolean;
  generatedAt: Date;
  data: any;
}

export interface Deposit {
  id: string;
  amount: number;
  method: 'card' | 'iban';
  status: 'pending' | 'paid' | 'refunded' | 'claimed';
  paidAt?: Date;
  refundedAt?: Date;
  claim?: DepositClaim;
  iban?: string;
}

export interface DepositClaim {
  id: string;
  amount: number;
  reason: string;
  photos: string[];
  receipts: string[];
  status: 'pending' | 'accepted' | 'rejected' | 'legal';
  submittedAt: Date;
}