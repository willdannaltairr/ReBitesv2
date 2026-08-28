'use client';

import { useEffect, useState } from 'react';

/**
 * Probes the fixed navbar band (top of the viewport) to detect which
 * `[data-nav]` section is underneath it. Sections opt in via
 * `data-nav="cream" | "green"`. Returns `overDark` when scrolled over a
 * "green" section so the navbar can flip to a dark, light-text theme.
 */
export function useNavSection(probeY = 44) {
  const [overDark, setOverDark] = useState(false);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('[data-nav]'),
    );

    if (sections.length === 0) {
      setOverDark(false);
      return;
    }

    const update = () => {
      const current = sections.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= probeY && rect.bottom > probeY;
      });

      setOverDark(current?.dataset.nav === 'green');
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [probeY]);

  return { overDark };
}