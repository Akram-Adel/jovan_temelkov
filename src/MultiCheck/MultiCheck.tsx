import './MultiCheck.css';

import React from 'react';

import _ from 'lodash';

import CheckOption from './components/CheckOption';
import ToColumns from './components/ToColumns';
import MultiCheckObservable from './utils/MultiCheckObservable';

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
 * @param {string[]} initialValues - initial checked option values
 * @param {number} columns - default value is 1
 * @param {Function} onChange - when checked options are changed,
 *                              they should be passed to outside
 */
type Props = {
  label?: string;
  options: Option[];
  columns?: number;
  initialValues?: string[];
  onChange?: (values: string[]) => void;
};

const MultiCheck: React.FunctionComponent<Props> = (props): JSX.Element => {
  const multiCheckObservable = React.useRef(
    new MultiCheckObservable(
      props.options.map((option) => option.value),
      props.initialValues,
    ),
  ).current;

  React.useEffect(() => {
    multiCheckObservable.subscribe((checkState) => {
      props.onChange?.(checkState.filter((s) => s.checked).map((s) => s.value));
    });

    return () => multiCheckObservable.cleanup();
  }, []);

  return (
    <div className="MultiCheck">
      {props.label ? <h2>{props.label}</h2> : null}

      <ToColumns columns={props.columns ?? 1}>
        <CheckOption selectAll multiCheckObservable={multiCheckObservable} />

        {props.options.map(({label, value}) => (
          <CheckOption key={value} {...{label, value, multiCheckObservable}} />
        ))}
      </ToColumns>
    </div>
  );
};

// We are only interested in re-rendering the component only when
// `options` or `initialValues` props change.
function propsAreEqual(prevProps: Props, nextProps: Props): boolean {
  // return true when the component should re-render, then inverse the
  // result and pass it to React.memo
  return !(function shouldRerender() {
    return (
      !_.isEqual(prevProps.options, nextProps.options) ||
      !_.isEqual(prevProps.initialValues, nextProps.initialValues)
    );
  })();
}

export default React.memo(MultiCheck, propsAreEqual);
