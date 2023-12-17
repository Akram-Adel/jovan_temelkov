import _ from 'lodash';

export type State = {value: string; checked: boolean}[];
type ObserverCallback = (state: State) => void;

/**
 * An observer-pattern class that emit events corresponding to the check
 * status changes
 */
class MultiCheckObservable {
  // observers to only their value changes
  private observers: Record<string, ObserverCallback[]> = {};

  // observers to all value changes
  private observersAll: ObserverCallback[] = [];

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

    this.notify(value);
  }

  // `checkAllValues` and `checkValue` need to have the same signature
  checkAllValues(_unused: string, checked: boolean = true) {
    this.state = this.state.map((s) => ({...s, checked}));

    this.notify();
  }

  /**
   * @param {string} value - the value that changed.\
   * if omitted, the method will assume that every value has changed and
   * it will notify all observers accordingly
   */
  notify(value?: string) {
    this.observersAll.forEach((observer) => observer(this.state));

    if (value) {
      this.observers[value]?.forEach((observer) => observer(this.state));
    } else {
      Object.entries(this.observers).forEach(([, observers]) => {
        observers.forEach((observer) => observer(this.state));
      });
    }
  }

  subscribe(value: string, cb: ObserverCallback) {
    // when subscribing to the update event, immediately call the
    // callback so that the subscriber matches its internal state to the
    // observable state
    cb(this.state);

    if (value === 'all') this.observersAll.push(cb);
    else {
      this.observers[value] = this.observers[value] || [];
      this.observers[value].push(cb);
    }
  }

  unsubscribe(value: string, cb: ObserverCallback) {
    if (value === 'all') this.observersAll.filter((sub) => sub !== cb);
    else if (this.observers[value]) this.observers[value].filter((sub) => sub !== cb);
  }

  cleanup() {
    this.observers = {};
    this.observersAll = [];
  }
}

export default MultiCheckObservable;
