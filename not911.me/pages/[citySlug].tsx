import type { GetStaticProps } from 'next';
import { getResourcesForCityByCategory } from '../utils/get-resources-for-city';
import { City, CityProps } from '../components/City';

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

    const [categories, resourcesByCategory] = getResourcesForCityByCategory(citySlug as string);

    return {
        props: {
            city,
            categories,
            resourcesByCategory,
        }
    }
}

export default function CityByName(props: CityProps) {
    return (
        <City {...props} />
    )
}
