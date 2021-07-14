# not911.me

Alternatives to dialing 911.

## To submit a correction or add a new resource

Either open a pull request with the correction/new resource or [open an issue](https://github.com/SeattleDSA/not911.me/issues/new/choose).

If neither of those options work for you, you can also securely email us at <techblocsea@protonmail.com>.

## Development

To run the site locally:

1. `gem install bundler`
1. `bundle install`
1. `bundle exec jekyll serve` -> This will run the site at `localhost:4000`
1. Make changes and contribute 🙌

## Deployment

The site is currently deployed through Netlify. This gives us a lot of good stuff like free deployment previews on pull requests as well as the contact form.

To deploy the site, simply merge a PR and Netlify will take care of the rest.

## How this site is structured

### Cities

This site is organized into several layers, the topmost being the "city" layer. A city is described by a simple markdown file with YAML frontmatter. For example, here's a minimal version of the Seattle, WA `city` markdown file:

```markdown
---
title: Seattle, WA
slug: seattle
nonemergency_phone:
  link: 2066255011
  display: (206) 625-5011
---
```

All these fields are required for a city.

You may also optionally add a `prior_art` property which can be any valid HTML. This will be rendered in the About section for the city. [See the actual Seattle city file for an example of this](https://raw.githubusercontent.com/SeattleDSA/not911.me/HEAD/_cities/seattle.md)

Note that the content of a city markdown file is completely ignored, so don't bother putting anything there.

### Resource Types

The next layer is the "resource type" layer. These represent the various categories of resources that are displayed on each city's page. They are yet again simply a markdown file with YAML frontmatter. This is a minimal example:

```markdown
---
title: Housing
slug: housing
order: 0
---
```

The resource type buttons and the resources themselves are ordered on the city page based on the `order` attribute of the resource type.

If a city has no resources of a given resource type, that resource type will be skipped for that city.

The content for a resource type is also ignored.

### Resources

The final layer is the "resource" which represents an individual alternative to dialing 911.

The resource is the most complicated data type and can encompass many edge cases.

Resources may belong to a particular city or they may be shared. Shared resources simply go in the `shared` folder in the `_resources` directory. A shared resource will be rendered for _every_ city so make sure it is truly a universal resource (like Trans Lifeline for example). Resources for a particular city go into a folder named after the slug for that city. So for Seattle resources, they go into a `seattle` folder. For Austin, TX resources, they would go into an `austin` folder.

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

Notice again that the resource is simply a markdown file with some frontmatter describing the resource. The major difference between the resource and the other two data types is that the content of the markdown is actually used as the description for the resource.

Resources can have the following fields:

- **title** (required): The title of the resource.
- **href** (required): A link to the resource's website, social media, or related.
- **category** (required): The resource type slug for this resource.
- **email** (optional): Optional email address for the resource to be displayed below the phones.
- **phones** (optional): An object representing the phones. This will almost always exist given the nature of the website but may not be present for certain resources that only have email addresses.
    - **phones.primary** (required): An object representing the primary phone.
        - **phones.primary.display** (required): How to display the primary phone.
        - **phones.primary.link** (required): The value to use when linking the phone. Should be a valid `tel:` link value.
    - **phones.secondary** (optional): An optional list of phone objects.
        - **phones.secondary[i].display** (required): How to display the phone number.
        - **phone.secondary[i].link** (required): How to link the phone. Should be a valid `tel:` link value.

There are a lot of examples of resources in the resources folder so just take a look around to get ideas for how these can be structured.
