import { ITaskParams } from '../model/task.types';

export const Task = (props: ITaskParams) => {
  const { task } = props;

  return (
    <>
      {Object.values(task).map((field) => (
        <p key={field}>{field}</p>
      ))}
    </>
  );
};
