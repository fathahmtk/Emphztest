export enum ProductCategory {
  AUTOMOBILE = 'Automobile Components',
  BUS_SHELTER = 'Bus Shelters',
  CABIN = 'Security Cabins',
  CUSTOM = 'Custom Structures',
  ENCLOSURE = 'Electrical Enclosures',
  FIRE_SAFETY = 'Fire Safety Equipment',
  INDUSTRIAL_PROTECTION = 'Industrial Protection',
  JUNCTION_BOX = 'Junction Boxes',
  KIOSK = 'Modular Kiosks',
  PORTABLE_TOILET = 'Portable Toilets',
  SMART_CABIN = 'Smart Living Pods',
  STRUCTURAL = 'Structural Profiles',
  WATER_STORAGE = 'Water Storage Solutions'
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
  gallery?: string[];
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

export interface BlogPost {
  slug: string;
  title: string;
  category: 'High-Intent' | 'Long-Tail';
  date: string;
  author: string;
  summary: string;
  imageUrl: string;
  content: string;
}
