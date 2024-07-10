import { ChangeEvent } from 'react';

export interface IInputProps {
  value: string;
  name: string;
  id: string;
  type?: string;
  className?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
