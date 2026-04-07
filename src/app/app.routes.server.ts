import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    // Home page — fully prerendered at build time for best performance
    path: '',
    renderMode: RenderMode.Prerender,
  },
  {
    // Admin login — CSR only (no sensitive content exposed via SSR)
    path: 'admin/login',
    renderMode: RenderMode.Client,
  },
  {
    // All admin routes — CSR (protected behind JWT, no SSR needed)
    path: 'admin/**',
    renderMode: RenderMode.Client,
  },
  {
    // All other public routes (catalog, product detail, blog, faq, etc.) — SSR
    path: '**',
    renderMode: RenderMode.Server,
  },
];
