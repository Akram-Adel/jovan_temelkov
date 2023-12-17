import React from 'react';

/**
 * @param {string} label - option label
 * @param {string} value - option value
 * @param {boolean} checked - mark option checked
 * @param {Function} onChange - called when the option checked state
 *                              changes
 */
type Props = {
  label: string;
  value: string;
  checked?: boolean;
  onChange: (checked: boolean) => void;
};

const CheckOption: React.FunctionComponent<Props> = (props): JSX.Element => {
  return (
    <div>
      <input
        key={props.value}
        type="checkbox"
        id={props.value}
        value={props.value}
        checked={props.checked}
        onChange={(e) => props.onChange(e.target.checked)}
      />
      <label htmlFor={props.value}> {props.label}</label>
    </div>
  );
};

export default CheckOption;
