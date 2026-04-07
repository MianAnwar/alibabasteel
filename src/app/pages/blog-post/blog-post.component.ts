import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { LucideAngularModule, Clock, Tag, ArrowLeft, ArrowRight } from 'lucide-angular';
import { ALL_BLOG_POSTS, BLOG_POST_BY_SLUG } from '../../shared/data/blog-posts.data';
import { ALL_PRODUCTS } from '../../shared/data/products.data';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { MarkdownPipe } from '../../shared/pipes/markdown.pipe';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.scss',
  imports: [RouterLink, DatePipe, LucideAngularModule, ProductCardComponent, MarkdownPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogPostComponent {
  readonly ClockIcon = Clock;
  readonly TagIcon = Tag;
  readonly ArrowLeftIcon = ArrowLeft;
  readonly ArrowRightIcon = ArrowRight;

  readonly slug = input<string>('');

  readonly post = computed(() => BLOG_POST_BY_SLUG.get(this.slug()) ?? null);

  readonly relatedProducts = computed(() => {
    const slugs = this.post()?.relatedProductSlugs ?? [];
    return ALL_PRODUCTS.filter(p => slugs.includes(p.slug));
  });

  // Prev / next posts
  readonly prevPost = computed(() => {
    const idx = ALL_BLOG_POSTS.findIndex(p => p.slug === this.slug());
    return idx > 0 ? ALL_BLOG_POSTS[idx - 1] : null;
  });

  readonly nextPost = computed(() => {
    const idx = ALL_BLOG_POSTS.findIndex(p => p.slug === this.slug());
    return idx < ALL_BLOG_POSTS.length - 1 ? ALL_BLOG_POSTS[idx + 1] : null;
  });
}

