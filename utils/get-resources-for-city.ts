import glob from 'glob';
import path from 'path';
import * as vfile from 'to-vfile';
import type { Literal, Parent } from 'unist';
import {unified} from 'unified';
import parse from 'remark-parse';
import frontmatter from 'remark-frontmatter';
import yaml from 'yaml';
import raw from 'rehype-raw';
import remark2rehype from 'remark-rehype';
import stringify from 'rehype-stringify';
import format from 'rehype-format';
import type { CategoryDescription, ResourceDescription } from '../types';

import { categories } from '../categories';

const compiler = unified().use(parse).use(remark2rehype, { allowDangerousHtml: true }).use(frontmatter, ['yaml']).use(raw).use(format).use(stringify);

const resourceFiles = glob.sync(path.join(process.cwd(), 'resources/**/*.md'));
const resources: ResourceDescription[] = resourceFiles.map((resourceFile) => {
    const parsed = compiler.parse(vfile.readSync(resourceFile)) as Parent<Literal<string>>;

    // @ts-ignore
    const hasYaml = parsed.children[0].type === 'yaml';
    let parsedYaml;
    if (hasYaml) {
        const theYaml = parsed.children[0];
        parsedYaml = yaml.parse(theYaml.value);
        parsed.children = parsed.children.slice(1);
    }

    const run = compiler.runSync(parsed);

    const stringified = compiler.stringify(run);
    return {
        fileName: resourceFile,
        frontmatter: parsedYaml,
        content: stringified,
    } as ResourceDescription;
});

const categoriesBySlug = categories.reduce((acc, c) => ({ ...acc, [c.slug]: c}), {} as Record<string, CategoryDescription>)

export const getResourcesForCityByCategory = (citySlug: string): [CategoryDescription[], Record<string, ResourceDescription[]>] => {
    const byCategory: Record<string, ResourceDescription[]> = {};
    const categoriesForCity: Record<string, CategoryDescription> = {};
    for (const resource of resources) {
        if (!resource.fileName.includes('shared') && !resource.fileName.includes(citySlug)) {
            continue;
        }

        if (resource.frontmatter.category) {
            const category = resource.frontmatter.category;
            if (category in byCategory) {
                byCategory[category].push(resource);
            } else {
                byCategory[category] = [resource]
            }
            if (! (category in categoriesForCity)) {
                categoriesForCity[category] = {...categoriesBySlug[category]};
            }
        } else if (resource.frontmatter.categories) {
            resource.frontmatter.categories.forEach(category => {
                if (category in byCategory) {
                    byCategory[category].push(resource);
                } else {
                    byCategory[category] = [resource]
                }
                if (! (category in categoriesForCity)) {
                    categoriesForCity[category] = {...categoriesBySlug[category]};
                }
            })
        }
    }

    const sortedCategories = Object.values(categoriesForCity).sort((a, b) => a.order - b.order);

    return [sortedCategories, byCategory];
}
