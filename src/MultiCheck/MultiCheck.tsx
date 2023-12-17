import './MultiCheck.css';

import React from 'react';

import CheckOption from './components/CheckOption';
import ToColumns from './components/ToColumns';

export type Option = {
  label: string;
  value: string;
};

/**
 * Notice:
 * 1. There should be a special `Select All` option with checkbox to control all passing options
 * 2. If columns > 1, the options should be placed from top to bottom in each column
 *
 * @param {string} label - the label text of this component
 * @param {Option[]} options - options
 * @param {string[]} values - default checked option values
 * @param {number} columns - default value is 1
 * @param {Function} onChange - when checked options are changed,
 *                             they should be passed to outside
 */
type Props = {
  label?: string;
  options: Option[];
  columns?: number;
  values?: string[];
  onChange?: (values: string[]) => void;
};

const MultiCheck: React.FunctionComponent<Props> = (props): JSX.Element => {
  function onOptionCheck(optionValue: Option['value']) {
    return function onChange(checked: boolean) {
      props.onChange?.(
        !checked
          ? (props.values ?? []).filter((value) => value !== optionValue)
          : [...(props.values ?? []), optionValue],
      );
    };
  }

  function toggleSelectAll(selectAll: boolean) {
    props.onChange?.(selectAll ? props.options.map((option) => option.value) : []);
  }

  return (
    <div className="MultiCheck">
      {props.label ? <h2>{props.label}</h2> : null}

      <ToColumns columns={props.columns ?? 1}>
        <CheckOption
          label="Select All"
          value="select-all"
          checked={props.options.length === props.values?.length}
          onChange={toggleSelectAll}
        />

        {props.options.map(({label, value}) => (
          <CheckOption
            key={value}
            {...{label, value}}
            checked={props.values?.includes(value)}
            onChange={onOptionCheck(value)}
          />
        ))}
      </ToColumns>
    </div>
  );
};

export default MultiCheck;
