import type { CategoryDescription, ResourceDescription } from '../types';
import { Resource } from './Resource';

export interface CategoryProps {
    category: CategoryDescription;
    resources: ResourceDescription[];
}

export const Category = ({ category: { slug, title }, resources }: CategoryProps) => (
    <section>
        <header>
            <h3 id={slug}>{title}</h3>
            <div className="buttons"><a href="#alternative-resources">Back to the top</a></div>
        </header>
        {resources.map((resource) => <Resource key={resource.frontmatter.href} resource={resource} />)}
    </section>
)
