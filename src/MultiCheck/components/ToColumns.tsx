import React from 'react';

/**
 * @param {number} columns - number of columns to render
 */
type Props = {
  columns: number;
  children: React.ReactNode[];
};

const ToColumns: React.FunctionComponent<Props> = (props): JSX.Element => {
  const children = props.children.flat();
  const childrenPerColumn = Math.ceil(children.length / props.columns);

  return (
    <div className="flex-row">
      {Array.from({length: props.columns}).map((_, index) => {
        const start = childrenPerColumn * index;
        const end = start + childrenPerColumn;

        return (
          <div key={`column-${index + 1}`} className="column">
            {children.slice(start, end)}
          </div>
        );
      })}
    </div>
  );
};

export default ToColumns;
