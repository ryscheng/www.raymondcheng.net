---
layout: post
title:  "High Performance Personalization with Next.js Middleware"
date:   2022-05-19 08:40:05
categories: projects
canonical_url: "https://www.plasmic.app/blog/nextjs-personalization"
---

In this blog post, we will show you how to implement personalization using [Next.js middleware](https://nextjs.org/docs/advanced-features/middleware). Traditionally, personalization was implemented on the server, which may incur many hundreds of milliseconds of latency before the user receives the content. With Next.js middleware and static site generation (SSG), we can serve rich personalized experiences entirely from the edge (i.e. CDN), resulting in significant performance improvements for your website and improved experiences for your users.

The techniques in the tutorial should be generally applicable to any Next.js application. For simplicity, we will use [Plasmic](https://www.plasmic.app/), a visual builder for the web, to quickly spin up different women’s and men’s versions of an e-commerce landing page. Plasmic makes it easy for content editors and designers to build and iterate on pages in a WYSIWYG editor, rendered within your existing website.

### Why personalize your website?

Tailoring content to a user’s tastes, can vastly improve the user’s experiences on your website, which can ultimately improve your conversion rates. By parsing HTTP request headers, you can respond with different versions of the site to your users. For example:

- **Return user**: By setting a cookie on the first visit, subsequent visits can show special content for return users, such as an enticing promotion.
- **Geographical**: Depending on a user’s locale or geographic location (i.e. as determined by IP address), you can translate the text, show locally relevant content, and show customized pricing in local currencies.
- **Tech stack**: From the user agent of the browser, you can present different content to iPhone or Android users, such as download links.
- **User info**: Once a user has logged in, then you can set cookies that contain information about the user, such as their gender or how often they shop on your website.

## How it works under the hood

### What is Next.js middleware?

```tsx
// pages/_middleware.js

export default function middleware (req, ev) {
  console.log('Edit and run this at the edge!')
  return new Response({
    ip: req.ip,
		cookies: req.cookies,
		...
  })
}
```

Middleware is a new powerful addition to the architecture of Next.js applications, first introduced in Next.js 12. Middleware are arbitrary functions that you can write, which are executed on user HTTP requests before they hit the Next.js server. In practice, middleware functions are deployed to the cloud edge (i.e. CDN), on a platform like [Vercel](https://vercel.com/). By running on the edge, middleware can quickly rewrite and reroute requests to the server, or respond directly to short-circuit the server. The fast performance comes with the trade-off of a [limited runtime environment](https://nextjs.org/docs/api-reference/edge-runtime). Middleware have been used to perform fast bot detection, feature flags, analytics, routing, and A/B tests.

### Fast Personalization with Next.js Static Generation

![comparison](/img/diagrams/nextjs-personalization/comparison-diagram.png)

Middleware allows us to implement personalization entirely on the edge. The middleware transparently redirects different users to different versions of your application, such as men’s and women’s versions of an e-commerce store, based on data from the HTTP request headers. The diagram above shows how Next.js personalization works at a high level when paired with static site generation (SSG).

1. The developer creates different versions of the page for different targeting parameters (e.g. men/women). With SSG, developers can push static pages to the content delivery network.
2. When a user first requests a page, the middleware will parse HTTP headers to determine which version of the page to serve.
3. The middleware transparently proxies the request to the route that serves the appropriate page.
4. Routes can either be served from the edge if built via SSG, or served from the server via server-side rendering (SSR). When routes are also served from the edge, users benefit from lower latencies to content.

In practice, the developer can implement each version as a separate route, and the middleware glues it all together.

### Compared to traditional approaches (server-side)

By leveraging **static site generation (SSG)** and serving from the edge**,** your personalized pages will be pre-generated and served close to your users, with all the performance benefits of your CDN. This configuration leads to significantly faster responses compared to server-side approaches, which require you to hit the origin server on every request.

## Implementing personalization on Next.js

For quick reference, see here for project assets of a working example:

- **[Plasmic Project](https://studio.plasmic.app/projects/nmaGnTcLgTRnTSEV33RJjp)**
- **[GitHub Repo](https://github.com/plasmicapp/nextjs-personalization-example)**

### Step 1: Install Next.js

First, make sure you are running at least version 12 of Next.js. An easy way to ensure this is to install the latest version:

```bash
$ npm install next@latest
```

If this is your first Next.js project, follow this [quickstart guide](https://nextjs.org/docs/getting-started) to get your Next.js project up and running.

### Step 2: Build your customized pages

Suppose you want the middleware to transparently route users visiting `/marketing/` to 1 of 3 possible paths:

- `pages/marketing/original.jsx` ⇒ `/marketing/original`
- `pages/marketing/women.jsx` ⇒ `/marketing/women`
- `pages/marketing/men.jsx` ⇒ `/marketing/men`

You can copy the original page to these 3 routes and make your various edits to the respective pages. If you leverage SSG via `getStaticProps`, then each of these pages will continue to be served from a CDN for best performance.

With middleware, these routes are hidden to the user, who just visits `/marketing/`. The middleware will select the correct route and transparently proxy users.

![womens-page](/img/diagrams/nextjs-personalization/womens.png)

_Women’s marketing page_

![mens-page](/img/diagrams/nextjs-personalization/mens.png)

_Men’s marketing page_

### Leveraging Plasmic

While you can use any JSX, for this example we’ll use Plasmic to quickly generate the men’s, women’s and generic versions of the page. In the [Plasmic project](https://studio.plasmic.app/projects/nmaGnTcLgTRnTSEV33RJjp), We have duplicated the marketing page and set custom routes for each targeting combination. You should see 3 versions of the page: `/marketing/original`, `/marketing/women`, and `/marketing/men`.

![plasmic-studio](/img/diagrams/nextjs-personalization/studio.png)

Because we are using static site generation, Plasmic generates code at build time so that static pages can be served from your CDN. If you are using `next dev`, the Plasmic Next.js plugin will also automatically rebuild on any detected changes from Plasmic Studio, allowing you to easily continuously edit your pages.

You can then include these routes in your Next.js project, by configuring the Plasmic Next.js plugin. First install the plugin.

```bash
$ npm install @plasmicapp/loader-nextjs
# or yarn add @plasmicapp/loader-nextjs
```

Then add a catch-all page, which will pull the pages from Plasmic and render them via `getStaticProps`. Note that we use the example project’s project ID and API token below. In order to use your own project, replace these 2 fields.

```jsx
// pages/[...catchall].tsx

import * as React from 'react'
import {
  initPlasmicLoader,
  PlasmicComponent,
  ComponentRenderData,
  PlasmicRootProvider,
} from '@plasmicapp/loader-nextjs'
import { GetStaticPaths, GetStaticProps } from 'next'
import Error from 'next/error'

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: 'nmaGnTcLgTRnTSEV33RJjp', // ID of a project you are using
      token: 'LaVkw3uGWUc47q7svO6bpTkApdpaDvR6hBMuewhmmvukHpuHQanR8wEtYvwWbhMugEX7Z1aS21bLvfe5S4wA', // API token for that project
    },
  ],
  // Fetches the latest revisions, whether or not they were unpublished!
  // Disable for production to ensure you render only published changes.
  preview: true,
})

/**
 * Use fetchPages() to fetch list of pages that have been created in Plasmic
 */
export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await PLASMIC.fetchPages()
  return {
    paths: pages.map((page) => ({
      params: { catchall: page.path.substring(1).split('/') },
    })),
    fallback: 'blocking',
  }
}

/**
 * For each page, pre-fetch the data we need to render it
 */
export const getStaticProps: GetStaticProps = async (context) => {
  const { catchall } = context.params ?? {}

  // Convert the catchall param into a path string
  const plasmicPath =
    typeof catchall === 'string'
      ? catchall
      : Array.isArray(catchall)
      ? `/${catchall.join('/')}`
      : '/'
  const plasmicData = await PLASMIC.maybeFetchComponentData(plasmicPath)
  if (plasmicData) {
    // This is a path that Plasmic knows about; pass the data
    // in as props
    return {
      props: { plasmicData },

      // Using incremental static regeneration, will re-generate this page
      // after 300s
      revalidate: 300,
    }
  } else {
    // This is some non-Plasmic catch-all page
    return {
      props: {},
    }
  }
}

/**
 * Actually render the page!
 */
export default function CatchallPage(props: { plasmicData?: ComponentRenderData }) {
  const { plasmicData } = props
  if (!plasmicData || plasmicData.entryCompMetas.length === 0) {
    return <Error statusCode={404} />
  }
  const pageMeta = plasmicData.entryCompMetas[0]
  return (
    // Pass in the data fetched in getStaticProps as prefetchedData
    <PlasmicRootProvider loader={PLASMIC} prefetchedData={plasmicData}>
      {
        // plasmicData.entryCompMetas[0].name contains the name
        // of the component you fetched.
      }
      <PlasmicComponent component={pageMeta.name} />
    </PlasmicRootProvider>
  )
}
```

### Step 3: Add the middleware

Now we want to create middleware that will run against the `/marketing` route. To do so, create the following file `/pages/marketing/_middleware.js`:

```tsx
// pages/marketing/_middleware.js

import { NextRequest, NextResponse } from 'next/server'
import { getPersonalizedRoute } from '../../util'

export function middleware(req: NextRequest) {
  // Get the personalized route
  const newRoute = getPersonalizedRoute(req.url, req.cookies, req.geo, req.ua)

  // Bypass if not found
  if (!newRoute) {
    return
  }

  // Proxy to the appropriate route
  return NextResponse.rewrite(newRoute)
}
```

In the example above, we determine a personalized route based on the URL, cookies, geographical location, and user agent via `getPersonalizedRoute` , which you’ll need to implement yourself. The middleware will transparently proxy to the appropriate page routes. If these pages are served from the edge, we can avoid a round trip to the origin server.

### Step 4: Deploy

Now deploy your application to production. You can see the demo [GitHub repository](https://github.com/plasmicapp/nextjs-personalization-example) deployed here:

[https://nextjs-personalization-example.vercel.app/marketing](https://nextjs-personalization-example.vercel.app/marketing)

_Note: Because we don’t have a way to determine gender in this example, `getPersonalizedRoute` will just choose a random version and set a cookie._

## Try Plasmic!

With Next.js middleware, we can we can now implement personalization in a way that is both easy for developers as well as highly performant for users. With these lower costs, the bottleneck becomes your organization’s ability to create new personalized content. Plasmic makes it easy for anyone in your organization to rapidly create new experiences or fork your existing pages in a rich visual editor. You can create a free account to get started at
[https://studio.plasmic.app/](https://studio.plasmic.app/)
