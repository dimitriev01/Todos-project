import { IButtonProps } from '../model/button.model';
import cls from './button.module.scss';

export const Button = (props: IButtonProps) => {
  const { children, type = 'button', className } = props;

  return (
    <button {...props} type={type} className={[cls.button, className].join(' ')}>
      {children}
    </button>
  );
};
