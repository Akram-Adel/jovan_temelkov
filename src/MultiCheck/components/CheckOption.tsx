import React, {useEffect} from 'react';

import type {Option} from '../MultiCheck';
import {CheckAllOptionState, CheckDefaultOptionState, CheckOptionState} from '../utils/CheckOptionState';
import MultiCheckObservable, {State} from '../utils/MultiCheckObservable';

/**
 * @param {string} label - option label
 * @param {string} value - option value
 * @param {boolean} checked - mark option checked
 * @param {Function} onChange - called when the option checked state
 *                              changes
 */
export type Props = {
  multiCheckObservable: MultiCheckObservable;
} & (Option | {selectAll: boolean});

const CheckOption: React.FunctionComponent<Props> = (props): JSX.Element => {
  const checkOptionState: CheckOptionState = React.useRef(
    'selectAll' in props ? new CheckAllOptionState() : new CheckDefaultOptionState(props),
  ).current;

  const [checked, setChecked] = React.useState(false);

  useEffect(() => {
    function observer(checkState: State) {
      const isChecked = checkOptionState.isChecked(checkState);
      setChecked(isChecked);
    }

    props.multiCheckObservable.subscribe(checkOptionState.subscription, observer);
    return () => props.multiCheckObservable.unsubscribe(checkOptionState.subscription, observer);
  }, []);

  return (
    <div>
      <input
        key={checkOptionState.value}
        type="checkbox"
        id={checkOptionState.value}
        value={checkOptionState.value}
        checked={checked}
        onChange={(e) => {
          props.multiCheckObservable[checkOptionState.onChangeMethod](
            checkOptionState.value,
            e.target.checked,
          );
        }}
      />
      <label htmlFor={checkOptionState.value}> {checkOptionState.label}</label>
    </div>
  );
};

export default CheckOption;
