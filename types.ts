import type { ReactNode } from 'react';

export interface Phone {
    link: number;
    display: string;
}

export interface Frontmatter {
    title: string;
    href: string;
    categories?: string[];
    category?: string;
    phones?: {
        primary?: Phone,
        secondary?: Phone[],
    };
    email?: string;
    mandatory_reporter?: boolean;
}

export interface ResourceDescription {
    fileName: string;
    frontmatter: Frontmatter;
    content: string;
}

export interface CategoryDescription {
    title: string;
    order: number;
    slug: string;
}

export interface CityDescription {
    name: string;
    slug: string;
    nonemergencyPhone: Phone;
    priorArt?: string;
}
