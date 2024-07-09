import { ReactNode } from 'react';

export interface IModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  children: ReactNode;
  title: string;
}
