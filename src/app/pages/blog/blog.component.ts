import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { LucideAngularModule, Clock, Tag, ArrowRight } from 'lucide-angular';
import { ALL_BLOG_POSTS } from '../../shared/data/blog-posts.data';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
  imports: [RouterLink, DatePipe, LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogComponent {
  readonly ClockIcon = Clock;
  readonly TagIcon = Tag;
  readonly ArrowRightIcon = ArrowRight;

  readonly posts = ALL_BLOG_POSTS;
  readonly featuredPost = ALL_BLOG_POSTS[0];
  readonly restPosts = ALL_BLOG_POSTS.slice(1);
}

