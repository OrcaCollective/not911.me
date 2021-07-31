import type { CategoryDescription, CityDescription } from '../types';

interface CategoriesProps {
    categories: CategoryDescription[];
    city: CityDescription;
}

export const Categories = ({ categories, city }: CategoriesProps) => (
    <section>
        <h2 id="alternative-resources">Alternative resources</h2>

        <p>
            Below are various alternatives to calling 911 in the {city.name} area.
        </p>

        <p>
            <strong>Note: All resources listed are available 24 hours a day unless otherwise noted.</strong>
        </p>

        <div className="buttons categories">
            {categories.map(category => (
                <a key={category.slug} href={`#${category.slug}`}>{category.title}</a>
            ))}
        </div>
    </section>

)
