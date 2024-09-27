export interface TSection {
    ID: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    description: string;
    buttontext: string;
    buttonlink: string;
    name: string;
    status: string;
    scheduled: boolean;
    subtitle?: string; // Optional field (only in some sections)
  }