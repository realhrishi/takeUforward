import React, { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function IconButton({ children, className, ...props }: IconButtonProps) {
  return (
    <button
      className={clsx(
        "flex items-center justify-center w-8 h-8 rounded-sm bg-bg-elevated border border-border-subtle",
        "text-text-secondary transition-colors duration-150 ease-in-out hover:border-border-default hover:text-text-primary focus:outline-none",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
