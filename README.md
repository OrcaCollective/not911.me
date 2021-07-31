# not911.me

Alternatives to dialing 911.

## To submit a correction or add a new resource

Either open a pull request with the correction/new resource or [open an issue](https://github.com/SeattleDSA/not911.me/issues/new/choose).

If neither of those options work for you, you can also securely email us at <techblocsea@protonmail.com>.

## Development

To run the site locally:

1. `yarn install`
1. `yarn dev` -> This will run the site at `localhost:3000`
1. Make changes and contribute 🙌

## Deployment

The site is currently deployed through Netlify. This gives us a lot of good stuff like free deployment previews on pull requests as well as the contact form.

To deploy the site, simply merge a PR and Netlify will take care of the rest.

## How this site is structured

### Cities

This site is organized into several layers, the topmost being the "city" layer. A city is described by a YAML file. For example, here's a minimal version of the Seattle, WA `city` yaml file:

```yaml
title: Seattle, WA
slug: seattle
nonemergency_phone:
  link: 2066255011
  display: (206) 625-5011
```

All these fields are required for a city.

You may also optionally add a `prior_art` property which can be any valid HTML. This will be rendered in the About section for the city. [See the actual Seattle city file for an example of this](https://raw.githubusercontent.com/SeattleDSA/not911.me/HEAD/_cities/seattle.md)

### Category

The next layer is the "category" layer. These represent the various categories of resources that are displayed on each city's page. They are yet again simply a YAML file. This is a minimal example:

```yaml
title: Housing
slug: housing
order: 0
```

The category buttons and the resources themselves are ordered on the city page based on the `order` attribute of the category.

If a city has no resources of a given category, that category will be skipped for that city.

### Resources

The final layer is the "resource" which represents an individual alternative to dialing 911.

The resource is the most complicated data type and can encompass many edge cases.

Resources may belong to a particular city or they may be shared. Shared resources simply go in the `shared` folder in the `resources` directory. A shared resource will be rendered for _every_ city so make sure it is truly a universal resource (like Trans Lifeline for example). Resources for a particular city go into a folder named after the slug for that city. So for Seattle resources, they go into a `seattle` folder. For Austin, TX resources, they would go into an `austin` folder.

A simple example of a resource is Seattle Alcoholics Anonymous:

```markdown
---
title: Seattle Alcoholics Anonymous
href: https://www.seattleaa.org/
category: health-and-substance-abuse
phones:
  primary:
    display: (206) 587-2838
    link: 2065872838
---

Speak to a sober alcoholic 24 hours a day.
```

Notice again that the resource is simply a markdown file with some frontmatter describing the resource. The content of the markdown file is used as the description for the resource.

Resources can have the following fields:

- **title** (required): The title of the resource.
- **href** (required): A link to the resource's website, social media, or related.
- **category** (optional): The category slug for this resource. Required if `categories` is unused.
- **categories** (optional): A list of category slugs for this resource. Required if `category` is unused.
- **email** (optional): Optional email address for the resource to be displayed below the phones.
- **phones** (optional): An object representing the phones. This will almost always exist given the nature of the website but may not be present for certain resources that only have email addresses.
    - **phones.primary** (required): An object representing the primary phone.
        - **phones.primary.display** (required): How to display the primary phone.
        - **phones.primary.link** (required): The value to use when linking the phone. Should be a valid `tel:` link value.
    - **phones.secondary** (optional): An optional list of phone objects.
        - **phones.secondary[i].display** (required): How to display the phone number.
        - **phone.secondary[i].link** (required): How to link the phone. Should be a valid `tel:` link value.

There are a lot of examples of resources in the resources folder so just take a look around to get ideas for how these can be structured.
