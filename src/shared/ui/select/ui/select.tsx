import { ISelectProps } from '../model/select.types';
import cls from './select.module.scss';

export const Select = (props: ISelectProps) => {
  const { value, onChange, values, id, name, className } = props;

  return (
    <select id={id} name={name} value={value} onChange={onChange} className={[cls.select, className].join(' ')}>
      {values.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  );
};
