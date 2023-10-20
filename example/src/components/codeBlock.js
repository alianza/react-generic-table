import React from 'react';

export function CodeBlock({ children, style = {}, className = '' }) {
  return (
    <pre style={{...style, whiteSpace: 'break-spaces'}} className={className}>
      <code>{children}</code>
    </pre>
  );
}
