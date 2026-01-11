//packages/type/src/index.ts

export type BusinessType = 'EINZELUNTERNEHMER' | 'GMBH';

export interface User {
  id: string;
  email: string;
  language: 'pl' | 'de' | 'en';
  businessType: BusinessType;
  region: string;
  createdAt: string;
}

export interface Deadline {
  id: string;
  title: string;
  dueDate: string;
  urgency: 'low' | 'medium' | 'high';
  description: string;
}
