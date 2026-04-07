import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, ChevronDown, ChevronUp, HelpCircle, MessageCircle } from 'lucide-angular';
import { ALL_FAQ, FAQ_BY_TOPIC, FAQ_TOPIC_LABELS } from '../../shared/data/faq.data';
import { FaqTopic } from '../../shared/models/product.model';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
  imports: [RouterLink, LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqComponent {
  readonly ChevronDownIcon = ChevronDown;
  readonly ChevronUpIcon = ChevronUp;
  readonly HelpCircleIcon = HelpCircle;
  readonly MessageCircleIcon = MessageCircle;

  readonly topics = Object.keys(FAQ_BY_TOPIC) as FaqTopic[];
  readonly faqByTopic = FAQ_BY_TOPIC;
  readonly topicLabels = FAQ_TOPIC_LABELS;

  // Track which FAQ entries are open — key is entry id
  readonly openIds = signal<Set<string>>(new Set());
  readonly activeTopic = signal<FaqTopic | 'all'>('all');

  toggle(id: string): void {
    this.openIds.update(set => {
      const next = new Set(set);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  isOpen(id: string): boolean {
    return this.openIds().has(id);
  }

  get visibleTopics(): FaqTopic[] {
    const at = this.activeTopic();
    return at === 'all' ? this.topics : [at];
  }
}

