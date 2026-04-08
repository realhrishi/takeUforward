import React from 'react';
import clsx from 'clsx';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span className={clsx(
      "inline-flex items-center px-2 py-0.5 rounded-sm bg-accent-range text-accent-primary text-[var(--text-xs)] font-medium tracking-wide",
      className
    )}>
      {children}
    </span>
  );
}
