import type {Option} from '../MultiCheck';

import type {State} from './MultiCheckObservable';

export interface CheckOptionState {
  label: string;
  value: string;

  onChangeMethod: 'checkValue' | 'checkAllValues';

  isChecked(checkState: State): boolean;
}

export class CheckDefaultOptionState implements CheckOptionState {
  label: string;
  value: string;

  onChangeMethod = 'checkValue' as const;

  constructor(option: Option) {
    this.label = option.label;
    this.value = option.value;
  }

  isChecked(checkState: State): boolean {
    return checkState.find((s) => s.value === this.value)!.checked;
  }
}

export class CheckAllOptionState implements CheckOptionState {
  label = 'Select All';
  value = 'select-all';

  onChangeMethod = 'checkAllValues' as const;

  isChecked(checkState: State): boolean {
    return checkState.every((s) => s.checked);
  }
}
