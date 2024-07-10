import { ReactNode } from 'react';

export interface IButtonProps {
  disabled?: boolean;
  type?: 'submit' | 'button';
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}
