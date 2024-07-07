import { ILayoutProps } from '../model/layout.types';
import cls from './layout.module.scss';

export const Layout = (props: ILayoutProps) => {
  const { children } = props;
  return <main className={cls.layout}>{children}</main>;
};
