import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/**
 * Minimal markdown → HTML pipe for blog post content.
 * Handles: headings (#–######), bold, italic, inline code,
 * fenced code blocks, blockquotes, unordered lists, ordered lists,
 * horizontal rules, and paragraphs.
 */
@Pipe({ name: 'markdown', standalone: true })
export class MarkdownPipe implements PipeTransform {
  private readonly sanitizer = inject(DomSanitizer);

  transform(value: string): SafeHtml {
    if (!value) return '';
    return this.sanitizer.bypassSecurityTrustHtml(this.toHtml(value));
  }

  private toHtml(md: string): string {
    const lines = md.replace(/\r\n/g, '\n').split('\n');
    const out: string[] = [];
    let inCodeBlock = false;
    let codeLang = '';
    let codeLines: string[] = [];
    let inList: 'ul' | 'ol' | null = null;

    const closeList = () => {
      if (inList) { out.push(inList === 'ul' ? '</ul>' : '</ol>'); inList = null; }
    };

    const inlineFormat = (s: string): string => {
      // inline code
      s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
      // bold
      s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      // italic
      s = s.replace(/\*(.+?)\*/g, '<em>$1</em>');
      // links
      s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
      return s;
    };

    for (const line of lines) {
      // fenced code block
      if (line.startsWith('```')) {
        if (!inCodeBlock) {
          closeList();
          inCodeBlock = true;
          codeLang = line.slice(3).trim();
          codeLines = [];
        } else {
          inCodeBlock = false;
          const langClass = codeLang ? ` class="language-${codeLang}"` : '';
          out.push(`<pre><code${langClass}>${codeLines.map(l => this.esc(l)).join('\n')}</code></pre>`);
          codeLang = '';
          codeLines = [];
        }
        continue;
      }
      if (inCodeBlock) { codeLines.push(line); continue; }

      // headings
      const hMatch = line.match(/^(#{1,6})\s+(.*)/);
      if (hMatch) {
        closeList();
        const level = hMatch[1].length;
        out.push(`<h${level}>${inlineFormat(hMatch[2])}</h${level}>`);
        continue;
      }

      // blockquote
      if (line.startsWith('> ')) {
        closeList();
        out.push(`<blockquote><p>${inlineFormat(line.slice(2))}</p></blockquote>`);
        continue;
      }

      // horizontal rule
      if (/^(-{3,}|\*{3,}|_{3,})$/.test(line.trim())) {
        closeList();
        out.push('<hr>');
        continue;
      }

      // unordered list
      const ulMatch = line.match(/^[-*]\s+(.*)/);
      if (ulMatch) {
        if (inList !== 'ul') { closeList(); inList = 'ul'; out.push('<ul>'); }
        out.push(`<li>${inlineFormat(ulMatch[1])}</li>`);
        continue;
      }

      // ordered list
      const olMatch = line.match(/^\d+\.\s+(.*)/);
      if (olMatch) {
        if (inList !== 'ol') { closeList(); inList = 'ol'; out.push('<ol>'); }
        out.push(`<li>${inlineFormat(olMatch[1])}</li>`);
        continue;
      }

      // blank line
      if (!line.trim()) {
        closeList();
        out.push('');
        continue;
      }

      // paragraph
      closeList();
      out.push(`<p>${inlineFormat(line)}</p>`);
    }

    closeList();
    if (inCodeBlock && codeLines.length) {
      out.push(`<pre><code>${codeLines.map(l => this.esc(l)).join('\n')}</code></pre>`);
    }

    return out.join('\n');
  }

  private esc(s: string): string {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
}
