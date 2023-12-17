import _ from 'lodash';

export type State = {value: string; checked: boolean}[];
type Observer = (state: State) => void;

/**
 * An observer-pattern class that emit events corresponding to the check
 * status changes
 */
class MultiCheckObservable {
  private observers: Observer[] = [];

  private state: State = [];

  constructor(values: string[], initialCheck: string[] = []) {
    this.state = [
      ...initialCheck.map((s) => ({value: s, checked: true})),
      ..._.difference(values, initialCheck).map((s) => ({value: s, checked: false})),
    ];
  }

  checkValue(value: string, checked: boolean = true) {
    const valueIndex = this.state.findIndex((s) => s.value === value);
    this.state[valueIndex].checked = checked;

    this.notify();
  }

  checkAllValues(_unused: string, checked: boolean = true) {
    this.state = this.state.map((s) => ({...s, checked}));

    this.notify();
  }

  notify() {
    this.observers.forEach((observer) => observer(this.state));
  }

  subscribe(cb: Observer) {
    // when subscribing to the update event, immediately call the
    // callback so that the subscriber matches its internal state to the
    // observable state
    cb(this.state);

    this.observers.push(cb);
  }

  unsubscribe(cb: Observer) {
    this.observers = this.observers.filter((sub) => sub !== cb);
  }

  cleanup() {
    this.observers = [];
  }
}

export default MultiCheckObservable;
