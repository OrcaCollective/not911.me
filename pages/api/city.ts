// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import type { CityDescription, CategoryDescription, ResourceDescription } from '../../types';

import { cities } from '../../cities';
import { getResourcesForCityByCategory } from '../../utils/get-resources-for-city';

interface Response {
    city: CityDescription;
    categories: CategoryDescription[];
    resources: Record<string, ResourceDescription[]>;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response | string>
) {
    const citySlug = req.query.slug;
    if (!citySlug) {
        return res.status(400).send("");
    }
    const city = cities.find(c => c.slug === citySlug);
    if (!city) {
        return res.status(404).send(`Could not find city with slug ${citySlug}`);
    }

    const [categories, resources] = getResourcesForCityByCategory(city.slug);

    return res.status(200).send({
        city,
        categories,
        resources,
    })
}
