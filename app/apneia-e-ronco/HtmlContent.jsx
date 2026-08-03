'use client';

import { useEffect, useRef } from 'react';

export default function HtmlContent({ html }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !html) return;
    containerRef.current.innerHTML = html;
  }, [html]);

  return <div ref={containerRef} />;
}
