import Head from 'next/head';
import type { CategoryDescription, ResourceDescription, CityDescription } from '../types';
import { Categories } from '../components/Categories';
import { Category } from '../components/Category';
import { Layout } from '../components/Layout';
import { Why } from '../components/Why';
import { MandatoryReporters } from '../components/MandatoryReporters';
import { About } from '../components/About';

export interface CityProps {
    city: CityDescription;
    resourcesByCategory: Record<string, ResourceDescription[]>;
    categories: CategoryDescription[];
}

export const City = ({ city, categories, resourcesByCategory }: CityProps) => (
    <>
        <Head>
            <title>Not 911 - {city.name}</title>
            <meta name="description" content={`Alternatives to 911 in ${city.name}`} />
        </Head>
        <Categories city={city} categories={categories} />
        <Why nonemergencyPhone={city.nonemergencyPhone} />
        {categories.map((category) => {
            const resources = resourcesByCategory[category.slug];
            return <Category category={category} resources={resources} key={category.slug} />
        })}
        <MandatoryReporters />
        <About city={city} />
    </>
)
