import { ITaskParams } from '../model/task.types';

export const Task = (props: ITaskParams) => {
  const { task } = props;

  return (
    <tr>
      {Object.values(task).map((field) => (
        <td key={field}>{field}</td>
      ))}
    </tr>
  );
};
