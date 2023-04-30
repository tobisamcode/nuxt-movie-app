export default defineNuxtConfig({
  routeRules: {
    "/examples/*": { redirect: "/redirect-route" },
    "/modify-headers-route": { headers: { "x-magic-of": "nuxt and vercel" } },
    "/spa": { ssr: false },
  },
});
