export enum ProductCategory {
  SMART_CABIN = 'Smart Living Pods',
  ENCLOSURE = 'Electrical Enclosures',
  KIOSK = 'Modular Kiosks',
  CABIN = 'Security Cabins',
  JUNCTION_BOX = 'Junction Boxes',
  CUSTOM = 'Custom Structures',
  AUTOMOBILE = 'Automobile Components',
  STRUCTURAL = 'Structural Profiles',
  CABLE_MANAGEMENT = 'Cable Management',
  FIRE_SAFETY = 'Fire Safety Equipment',
  WATER_STORAGE = 'Water Storage Solutions',
  INDUSTRIAL_PROTECTION = 'Industrial Protection'
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  shortDescription: string;
  fullDescription: string;
  specs: ProductSpec[];
  features: string[];
  imageUrl: string;
  downloads: { title: string; type: 'PDF' | 'CAD' }[];
  accessories?: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  location: string;
  category: string;
  challenge: string;
  solution: string;
  outcome: string;
  imageUrl: string;
}

export interface RFQItem {
  productId: string;
  quantity: number;
  productName: string;
}

export interface ChatMessage {
  role: 'user' | 'model' | 'system';
  text: string;
  isError?: boolean;
}