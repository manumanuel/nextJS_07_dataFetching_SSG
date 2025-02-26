## Page pre-rendering

- In NextJS, page pre-rendering is the process of generating HTML for a page at build time or at request time (ie before it send to browser). The key goal of pre-rendering is to make the page load faster by serving the pre-generated static HTML content, which enhances the performance and improves SEO.

- NextJS provides different methods for page pre-rendering

1. SSG (Static Site Generation)

- Static generation is when nextJS generates the HTML for the page based on the content (fetched from API or data source) and stores it as static HTML.
- So when a user visit the page they receive the pre-built HTML content.
- Static pages can cached and can be served for xle requests
- Useful for pages with content that doesn't change frequently such as blogs, marketing pages, product listing etc
- To enable SSG in NextJS, we can use 'getStaticProps' to fetch data and generate page at build time
  - getStaticProps runs at build time and fetches data from an API.
  - The fetched data is passed as props to the component to render the HTML.
  - The page will be pre-generated at build time and served as static content.

2. SSR (Server Sider Rendering)

- Server side rendering is when HTML for a page is generated on every request, not at build time. This means, page content is generated dynamically on the server for every user visit.
- when a user request a page, the server generates the HTML on fly based on the latest data
- page is rendered on server, sent to browser and then client-side javascript takeover for further interactions.
- useful for pages where data must be up-to-date and personalized such as user profiles, dashboards, pages with content that change frequently
- To enable SSR in NextJS, we can use 'getServerSideProps', which fetch data and generate the page on each request

3. ISR (Incremental Static Regeneration)

- it allows to update static content after the page has been built.With ISR, NextJS let us generate the static pages during runtime and update them as needed without rebuilding the entire site
- We can use 'getStaticProps' to create static pages but also specify how often they should be regenerated using the 'revalidate' property
- if the page request happens after the revalidation time, NextJS will regenerate the page in the background while serving the old static content until new page is ready.
  -The page will be statically generated at build time.
  - It will be revalidated (regenerated) every N seconds, keeping the content up-to-date.

### Summary of Prerendering Methods

Static Generation (SSG): Generates HTML at build time. Ideal for static content that doesn't change often.
Server-Side Rendering (SSR): Generates HTML on each request. Ideal for dynamic or personalized content.
Incremental Static Regeneration (ISR): Allows static pages to be updated after the initial build, with flexibility to revalidate content periodically

## Hydration

- The HTML generated by the server is displayed to the user. This is known as 'first render'
- Then the javascript bundle (react & app codes) loads on the client
- React then hydrates the static html by attaching the event listeners, managing state and ensuring the page is ready for server interactions
- The react app becomes fully interactive after the client-side javascripts takes control

## Hydration mismatch

- happens when the HTML rendered on the server does not match the HTML generated by React on the client. This mismatch can lead to visual glitches or inconsistent behavior between server and client
- For example, if you have a component that relies on 'window' or other client-specific objects during the initial render, it can cause the HTML output on the server and the client to differ, leading to hydration errors
- We can fix this by ensuring that browser-specific logic only runs on the client-side. One common approach is to use useEffect (which runs only on the client side) or check for window existence before using it

### Hydration summary

Hydration is the process where the React app takes over static HTML generated by the server to make it interactive on the client side.
It is important for improving performance, SEO, and user experience in server-rendered React applications.
Hydration errors occur when the HTML rendered on the server doesn’t match what React tries to render on the client, often caused by using client-specific objects like window or document during server-side rendering.
Properly managing client-specific logic and using tools like useEffect or dynamic imports can prevent hydration mismatches and errors

## Implementation - getStaticProps

- if a component has getStaticProps function then it should run first and then run the component function
- getStaticProps must return an object with 'props' key
