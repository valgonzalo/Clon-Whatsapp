import { useState, useRef, useEffect } from 'react';

export default function ResizablePanel({ children, initialWidth = 420, minWidth = 280, maxWidth = 600 }) {
  const [width, setWidth] = useState(initialWidth);
  const [isResizing, setIsResizing] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing) return;

      const newWidth = e.clientX;
      if (newWidth >= minWidth && newWidth <= maxWidth) {
        setWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isResizing, minWidth, maxWidth]);

  const handleMouseDown = () => {
    setIsResizing(true);
  };

  return (
    <div
      ref={panelRef}
      style={{ width: `${width}px` }}
      className="relative h-full bg-[var(--bg-side)] border-r border-[var(--border-default)] flex flex-col transition-none"
    >
      {children}
      <div
        onMouseDown={handleMouseDown}
        className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-[var(--accent-green)] hover:opacity-50 transition-all"
        style={{ userSelect: 'none' }}
      />
    </div>
  );
}
