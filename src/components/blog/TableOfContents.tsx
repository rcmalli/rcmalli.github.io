import { useEffect, useState } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Extract headings from the article content
    const article = document.querySelector('article');
    if (!article) return;

    const elements = article.querySelectorAll('h2, h3');
    const items: TocItem[] = [];
    const slugCounts = new Map<string, number>();

    const slugify = (value: string) => {
      const base = value
        .normalize('NFKD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      return base || 'section';
    };

    const getUniqueId = (base: string) => {
      const count = slugCounts.get(base) ?? 0;
      slugCounts.set(base, count + 1);
      return count === 0 ? base : `${base}-${count + 1}`;
    };

    elements.forEach((el) => {
      const baseId = el.id?.trim() || slugify(el.textContent || '');
      const uniqueId = getUniqueId(baseId || 'section');
      if (el.id !== uniqueId) {
        el.id = uniqueId;
      }

      items.push({
        id: uniqueId,
        text: el.textContent || '',
        level: el.tagName === 'H2' ? 2 : 3,
      });
    });

    setHeadings(items);

    // Set up intersection observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-100px 0px -70% 0px',
        threshold: 0,
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) {
    return null;
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 120;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      setActiveId(id);
    }
  };

  return (
    <nav className="relative">
      {/* Header */}
      <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-4">
        On this page
      </p>

      {/* Active indicator line */}
      <div className="absolute left-0 top-8 bottom-0 w-px bg-border/50" />

      <ul className="space-y-0.5 relative">
        {headings.map((heading) => {
          const isActive = activeId === heading.id;
          return (
            <li key={heading.id} className="relative">
              {/* Active marker */}
              {isActive && (
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-4 bg-[color:var(--accent-blue)] transition-all duration-200"
                  style={{ marginLeft: '-0.5px' }}
                />
              )}
              <a
                href={`#${heading.id}`}
                onClick={(e) => handleClick(e, heading.id)}
                className={`
                  block text-[13px] leading-relaxed py-1.5 pl-3 transition-all duration-200
                  ${heading.level === 3 ? 'pl-5' : ''}
                  ${
                    isActive
                      ? 'text-[color:var(--accent-blue)]'
                      : 'text-muted-foreground/70 hover:text-[color:var(--accent-blue)]'
                  }
                `}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
