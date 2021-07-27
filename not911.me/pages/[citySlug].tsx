import type { GetStaticProps } from 'next';
import Head from 'next/head';
import { getResourcesForCityByCategory } from '../utils/get-resources-for-city';
import type { CategoryDescription, ResourceDescription, City } from '../types';
import { Categories } from '../components/Categories';
import { Category } from '../components/Category';
import { Layout } from '../components/Layout';
import { Why } from '../components/Why';
import { MandatoryReporters } from '../components/MandatoryReporters';
import { About } from '../components/About';

import { cities } from '../cities';

export const getStaticPaths = () => {
    return {
        paths: cities.map(({ slug }) => ({ params: { citySlug: slug }})),
        fallback: true,
    }
}

export const getStaticProps: GetStaticProps = async(context) => {
    const citySlug = context.params?.citySlug;
    const city = cities.find(c => c.slug === citySlug);
    if (!city) {
        return {notFound: true};
    }

    const [categories, resourcesByCategory] = await getResourcesForCityByCategory(citySlug as string);

    return {
        props: {
            city,
            categories,
            resourcesByCategory,
        }
    }
}

interface CityByNameProps {
    city: City;
    resourcesByCategory: Record<string, ResourceDescription[]>;
    categories: CategoryDescription[];
}

export default function CityByName({ city, resourcesByCategory, categories }: CityByNameProps) {
    return (
        <Layout>
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
        </Layout>
    )
}
