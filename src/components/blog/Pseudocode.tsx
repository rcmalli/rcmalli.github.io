import { useEffect, useRef, useState } from 'react';

interface PseudocodeProps {
  code: string;
  caption?: string;
}

declare global {
  interface Window {
    pseudocode: {
      renderElement: (element: HTMLElement, options?: Record<string, unknown>) => void;
    };
    katex: unknown;
  }
}

export function Pseudocode({ code, caption }: PseudocodeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load pseudocode.js CSS
    if (!document.querySelector('link[href*="pseudocode"]')) {
      const cssLink = document.createElement('link');
      cssLink.rel = 'stylesheet';
      cssLink.href = 'https://cdn.jsdelivr.net/npm/pseudocode@2.4.1/build/pseudocode.min.css';
      document.head.appendChild(cssLink);
    }

    // Load KaTeX (required by pseudocode.js)
    const loadKatex = () => {
      return new Promise<void>((resolve, reject) => {
        if (window.katex) {
          resolve();
          return;
        }

        const katexScript = document.createElement('script');
        katexScript.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js';
        katexScript.onload = () => resolve();
        katexScript.onerror = () => reject(new Error('Failed to load KaTeX'));
        document.head.appendChild(katexScript);
      });
    };

    // Load pseudocode.js
    const loadPseudocode = () => {
      return new Promise<void>((resolve, reject) => {
        if (window.pseudocode) {
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/pseudocode@2.4.1/build/pseudocode.min.js';
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load pseudocode.js'));
        document.head.appendChild(script);
      });
    };

    const init = async () => {
      try {
        await loadKatex();
        await loadPseudocode();
        setLoaded(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load dependencies');
      }
    };

    init();
  }, []);

  useEffect(() => {
    if (loaded && containerRef.current && window.pseudocode && code) {
      try {
        // Clear previous content using DOM methods
        while (containerRef.current.firstChild) {
          containerRef.current.removeChild(containerRef.current.firstChild);
        }

        // Create a pre element with the pseudocode
        const pre = document.createElement('pre');
        pre.id = `pseudocode-${Math.random().toString(36).substr(2, 9)}`;
        pre.className = 'pseudocode-input';
        pre.style.display = 'none';
        // Use textContent for safe content insertion
        pre.textContent = code;
        containerRef.current.appendChild(pre);

        // Render the pseudocode
        window.pseudocode.renderElement(pre, {
          captionCount: 0,
          lineNumber: true,
          lineNumberPunc: ':',
          noEnd: false,
        });

        // Show rendered content
        const rendered = containerRef.current.querySelector('.pseudocode');
        if (rendered) {
          rendered.classList.add('block');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to render pseudocode');
      }
    }
  }, [loaded, code]);

  if (error) {
    return (
      <div className="my-6 p-4 border border-destructive/50 rounded-sm bg-destructive/10 text-destructive">
        <p className="font-mono text-sm">Error: {error}</p>
        <pre className="mt-2 text-xs overflow-auto">{code}</pre>
      </div>
    );
  }

  return (
    <div className="my-8">
      {caption && <p className="text-sm text-muted-foreground mb-2 font-medium">{caption}</p>}
      <div
        ref={containerRef}
        className="pseudocode-container overflow-x-auto bg-muted/30 rounded-sm p-4 border border-border/50"
      >
        {!loaded && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            <span className="text-sm">Loading pseudocode...</span>
          </div>
        )}
      </div>
    </div>
  );
}
