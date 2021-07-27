import { cities } from '../cities';
import { getResourcesForCityByCategory } from '../utils/get-resources-for-city';
import { City, CityProps } from '../components/City';
import type { CityDescription } from '../types';

export const getStaticProps = () => {
    const seattle = cities.find(c => c.slug === 'seattle') as CityDescription;
    
    const [categories, resourcesByCategory] = getResourcesForCityByCategory(seattle.slug);
    return {
        props: {
            city: seattle,
            categories,
            resourcesByCategory,
        }
    }
}

export default function Home(props: CityProps) {
    return <City {...props} />
}
