
import React from 'react';

export type Language = 'en' | 'he' | 'ar' | 'ru';

export interface SiteSettings {
  whatsapp: string;
  paymentPhone: string;
  gmail: string;
  instagram: string;
  telegram: string;
}

export interface StaffMember {
  id: string;
  username: string;
  password?: string;
  name: string;
  phone: string;
  city: string;
  couponCode: string;
  earnings: number;
  salesCount: number;
  joinedDate: string;
  personalNotes?: string;
  successStories?: string[];
}

export interface WithdrawalRequest {
  id: string;
  workerId: string;
  amount: number;
  method: 'Bit' | 'Paybox';
  status: 'pending' | 'completed' | 'rejected';
  date: string;
}

export interface StaffRequest {
  id: string;
  name: string;
  age: string;
  phone: string;
  email: string;
  city: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
}

export interface ServicePrice {
  amount: number;
  price: number;
  originalPrice?: number;
  labelEn: string;
  labelHe: string;
  labelAr: string;
  labelRu: string;
  descEn?: string;
  descHe?: string;
  descAr?: string;
  descRu?: string;
  isBundle?: boolean;
}

export interface ServiceData {
  id: string;
  titleEn: string;
  titleHe: string;
  titleAr: string;
  titleRu: string;
  descriptionEn: string;
  descriptionHe: string;
  descriptionAr: string;
  descriptionRu: string;
  iconId: string;
  prices?: ServicePrice[];
  isPromo?: boolean;
  isDynamic?: boolean;
  min?: number;
  max?: number;
  step?: number;
  unitPrice?: number;
}

export interface FAQItem {
  id: string;
  question: Record<Language, string>;
  answer: Record<Language, string>;
}

export interface CartItem {
  id: string;
  serviceId: string;
  serviceTitle: string;
  packageLabel: string;
  price: number;
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  handle: string;
  content: string;
  rating: number;
  status: 'approved' | 'pending' | 'rejected';
  date: string;
}

export interface Order {
  id: string;
  serviceId: string;
  packageName: string;
  price: number;
  link: string;
  phone: string;
  method: 'Bit' | 'Paybox';
  date: string;
  status: 'new' | 'completed';
  receiptImage?: string;
}

export interface Coupon {
  id?: string;
  code: string;
  discount: number;
  isActive: boolean;
}

export interface Translation {
  heroTitle: string;
  heroSub: string;
  promoText: string;
  orderBtn: string;
  addToCartBtn: string;
  selectAmount: string;
  guaranteeText: string;
  footerRights: string;
  contactSupport: string;
  flashSale: string;
  savePercent: string;
  servicesTitle: string;
  trustTitle: string;
  testimonialsBadge: string;
  faqTitle: string;
  faqSub: string;
  checkoutTitle: string;
  secureSupport: string;
  selectedPlanLabel: string;
  profileLinkInput: string;
  postLinkInput: string;
  phoneInput: string;
  couponLabel: string;
  applyBtn: string;
  totalPayable: string;
  proceedBtn: string;
  transferToLabel: string;
  uploadReceipt: string;
  clickToUpload: string;
  completeOrderBtn: string;
  bitMethod: string;
  payboxMethod: string;
  supportPlaceholder: string;
  whatsappBtn: string;
  validCoupon: string;
  invalidCoupon: string;
  invalidLink: string;
  invalidPhone: string;
  navHome: string;
  navServices: string;
  navFAQ: string;
  navTerms: string;
  navPrivacy: string;
  footerSupportHub: string;
  footerInstantChat: string;
  footerOfficialEmail: string;
  footerBrandDesc: string;
  footerQuickLinks: string;
  cartEmpty: string;
  cartTitle: string;
  itemRemoved: string;
  howItWorksTitle: string;
  howItWorksStep1Title: string;
  howItWorksStep1Desc: string;
  howItWorksStep2Title: string;
  howItWorksStep2Desc: string;
  howItWorksStep3Title: string;
  howItWorksStep3Desc: string;
  howItWorksStep4Title: string;
  howItWorksStep4Desc: string;
  staffPortalTitle: string;
  staffOverview: string;
  staffMilestones: string;
  staffAiMentor: string;
  staffWithdraw: string;
  staffMinWithdraw: string;
  staffCouponCode: string;
  staffCommissionEarned: string;
  staffSalesMade: string;
  staffRank: string;
  staffRoadTo: string;
  hiringTitle: string;
  hiringDesc: string;
  hiringFullName: string;
  hiringAge: string;
  hiringCity: string;
  hiringEmail: string;
  hiringSubmit: string;
  hiringSuccess: string;
  aiFeatureTitle: string;
  aiFeatureDesc: string;
  aiFeatureBadge: string;
}
