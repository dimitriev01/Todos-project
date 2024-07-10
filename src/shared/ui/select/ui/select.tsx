import { ISelectProps } from '../model/select.types';

export const Select = (props: ISelectProps) => {
  const { value, onChange, values } = props;

  return (
    <select id='select' name='select' value={value} onChange={onChange}>
      {values.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  );
};
