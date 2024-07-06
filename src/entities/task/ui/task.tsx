import { ITaskParams } from '../model/task.types';

export const Task = (props: ITaskParams) => {
  const { task } = props;

  return (
    <li>
      {Object.values(task).map((field) => (
        <p key={field}>{field}</p>
      ))}
    </li>
  );
};
