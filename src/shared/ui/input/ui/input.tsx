import { IInputProps } from '../model/input.types';
import cls from './input.module.scss';

export const Input = (props: IInputProps) => {
  const { className, type = 'text' } = props;
  return <input {...props} type={type} className={[cls.input, className].join(' ')} />;
};
