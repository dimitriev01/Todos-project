import { ChangeEvent } from 'react';

export interface ISelectProps {
  name: string;
  id: string;
  values: string[];
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}
