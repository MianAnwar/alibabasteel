import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Product } from '../../shared/models/product.model';
import { ConfigService } from './config.service';

export interface PageSeoConfig {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly meta = inject(Meta);
  private readonly titleService = inject(Title);
  private readonly document = inject(DOCUMENT);
  private readonly config = inject(ConfigService);

  private get siteUrl(): string {
    return this.config.links.siteUrl;
  }
  private get siteName(): string {
    return this.config.links.siteName;
  }

  /** Set all SEO meta for a page at once */
  setPage(cfg: PageSeoConfig): void {
    this.updateTitle(cfg.title);
    this.updateMeta(cfg.description, cfg.image);
    if (cfg.canonical) {
      this.setCanonicalUrl(cfg.canonical);
    }
  }

  updateTitle(title: string): void {
    this.titleService.setTitle(`${title} | AliBabaSteel`);
  }

  updateMeta(description: string, image?: string): void {
    this.meta.updateTag({ name: 'description', content: description });
    // Open Graph
    this.meta.updateTag({ property: 'og:title', content: this.titleService.getTitle() });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: this.siteName });
    if (image) {
      const imgUrl = image.startsWith('http') ? image : `${this.siteUrl}${image}`;
      this.meta.updateTag({ property: 'og:image', content: imgUrl });
      this.meta.updateTag({ name: 'twitter:image', content: imgUrl });
    }
    // Twitter Card
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: this.titleService.getTitle() });
    this.meta.updateTag({ name: 'twitter:description', content: description });
  }

  setCanonicalUrl(url: string): void {
    const fullUrl = url.startsWith('http') ? url : `${this.siteUrl}${url}`;
    let link: HTMLLinkElement | null = this.document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', fullUrl);
    this.meta.updateTag({ property: 'og:url', content: fullUrl });
  }

  addJsonLd(data: Record<string, unknown>): void {
    this.clearJsonLd();
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-seo', 'jsonld');
    script.textContent = JSON.stringify(data);
    this.document.head.appendChild(script);
  }

  addMultipleJsonLd(items: Record<string, unknown>[]): void {
    this.clearJsonLd();
    for (const data of items) {
      const script = this.document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo', 'jsonld');
      script.textContent = JSON.stringify(data);
      this.document.head.appendChild(script);
    }
  }

  private clearJsonLd(): void {
    this.document.querySelectorAll('script[data-seo="jsonld"]').forEach(el => el.remove());
  }

  /** LocalBusiness schema for home / contact pages */
  getLocalBusinessSchema(): Record<string, unknown> {
    return {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: this.siteName,
      description:
        'AliBabaSteel — computer tables manufacturer in Pakistan: gaming tables, standing adjustable desks, office desks, and custom-built computer tables.',
      url: this.siteUrl,
      telephone: this.config.links.phonePrimary,
      email: this.config.links.emails.info,
      address: {
        '@type': 'PostalAddress',
        streetAddress: this.config.links.addressLine1,
        addressLocality: this.config.links.addressLine2,
        addressCountry: 'PK',
      },
      priceRange: '$$',
      image: `${this.siteUrl}/assets/og-image.jpg`,
      sameAs: [
        this.config.links.instagram,
        this.config.links.facebook,
        this.config.links.youtube,
      ].filter(s => s && s !== 'TODO'),
    };
  }

  /** Product JSON-LD schema for product detail pages */
  getProductSchema(product: Product): Record<string, unknown> {
    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.description.substring(0, 300),
      sku: product.sku,
      image: product.images.map(img =>
        img.src.startsWith('http') ? img.src : `${this.siteUrl}${img.src}`
      ),
      brand: { '@type': 'Brand', name: 'AliBabaSteel' },
      material: product.tabletop?.material ?? product.frame.material,
      ...(product.dimensions.width
        ? { width: { '@type': 'QuantitativeValue', value: product.dimensions.width, unitCode: 'MMT' } }
        : {}),
      ...(product.dimensions.height
        ? { height: { '@type': 'QuantitativeValue', value: product.dimensions.height, unitCode: 'MMT' } }
        : {}),
      ...(product.weight
        ? { weight: { '@type': 'QuantitativeValue', value: product.weight, unitCode: 'KGM' } }
        : {}),
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
        priceCurrency: 'PKR',
        priceSpecification: {
          '@type': 'PriceSpecification',
          description: `Price tier: ${product.priceTier}. Contact for exact quote.`,
        },
        seller: { '@type': 'Organization', name: 'AliBabaSteel' },
      },
    };
  }

  /** BreadcrumbList JSON-LD */
  getBreadcrumbSchema(crumbs: { name: string; url: string }[]): Record<string, unknown> {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: crumbs.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: c.name,
        item: c.url.startsWith('http') ? c.url : `${this.siteUrl}${c.url}`,
      })),
    };
  }

  /** FAQPage JSON-LD */
  getFaqSchema(faqs: { question: string; answer: string }[]): Record<string, unknown> {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(f => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    };
  }

  /** Article JSON-LD for blog posts */
  getArticleSchema(post: {
    title: string;
    excerpt: string;
    coverImage: string;
    publishedAt: string;
    slug: string;
  }): Record<string, unknown> {
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.excerpt,
      image: post.coverImage.startsWith('http')
        ? post.coverImage
        : `${this.siteUrl}${post.coverImage}`,
      datePublished: post.publishedAt,
      author: { '@type': 'Organization', name: 'AliBabaSteel' },
      publisher: {
        '@type': 'Organization',
        name: 'AliBabaSteel',
        logo: { '@type': 'ImageObject', url: `${this.siteUrl}/assets/logo.svg` },
      },
      mainEntityOfPage: { '@type': 'WebPage', '@id': `${this.siteUrl}/blog/${post.slug}` },
    };
  }
}
