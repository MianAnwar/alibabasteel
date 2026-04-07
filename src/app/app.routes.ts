import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './components/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import('./pages/home/home.component').then(m => m.HomeComponent),
      },
      {
        path: 'catalog',
        loadComponent: () =>
          import('./pages/catalog/catalog.component').then(m => m.CatalogComponent),
      },
      {
        path: 'catalog/:category',
        loadComponent: () =>
          import('./pages/category/category.component').then(m => m.CategoryComponent),
      },
      {
        path: 'catalog/:category/:item',
        loadComponent: () =>
          import('./pages/item/item.component').then(m => m.ItemComponent),
      },
      {
        path: 'compare',
        loadComponent: () =>
          import('./pages/compare/compare.component').then(m => m.CompareComponent),
      },
      {
        path: 'configure',
        loadComponent: () =>
          import('./pages/configure/configure.component').then(m => m.ConfigureComponent),
      },
      {
        path: 'custom-order',
        loadComponent: () =>
          import('./pages/custom-order/custom-order.component').then(m => m.CustomOrderComponent),
      },
      {
        path: 'bulk-order',
        loadComponent: () =>
          import('./pages/bulk-order/bulk-order.component').then(m => m.BulkOrderComponent),
      },
      {
        path: 'gallery',
        loadComponent: () =>
          import('./pages/gallery/gallery.component').then(m => m.GalleryPageComponent),
      },
      {
        path: 'faq',
        loadComponent: () =>
          import('./pages/faq/faq.component').then(m => m.FaqComponent),
      },
      {
        path: 'blog',
        loadComponent: () =>
          import('./pages/blog/blog.component').then(m => m.BlogComponent),
      },
      {
        path: 'blog/:slug',
        loadComponent: () =>
          import('./pages/blog-post/blog-post.component').then(m => m.BlogPostComponent),
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./pages/about/about.component').then(m => m.AboutComponent),
      },
      {
        path: 'contact',
        loadComponent: () =>
          import('./pages/contact/contact.component').then(m => m.ContactComponent),
      },
    ],
  },
  {
    path: 'admin/login',
    loadComponent: () =>
      import('./pages/admin/login/admin-login.component').then(m => m.AdminLoginComponent),
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import('./pages/admin/dashboard/admin-dashboard.component').then(
            m => m.AdminDashboardComponent,
          ),
      },
      {
        path: 'inquiries',
        loadComponent: () =>
          import('./pages/admin/inquiries/admin-inquiries.component').then(
            m => m.AdminInquiriesComponent,
          ),
      },
      {
        path: 'qa',
        loadComponent: () =>
          import('./pages/admin/qa/admin-qa.component').then(m => m.AdminQaComponent),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent),
  },
];
