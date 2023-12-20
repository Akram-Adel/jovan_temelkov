import store from '../../store';

/**
 * @typedef {Object} State
 * @property {number} id
 * @property {Object.<string, string[]>} interestInfo
 * @property {Object.<string, string[]>} productDetails
 */

/**
 * Instead of polluting the redux store with low level details (such as:
 * which product is selected), I chose to create a custom observable
 * class that is responsible of managing the selected-product and notify
 */
class ProductDetailsObservable {
  /** @type {Function[]} - an array of callback functions */
  _observers = [];

  /** @type {State | null} - state of the selected product */
  _state = null;

  /**
   * Calls all observers with the current state
   */
  _notify() {
    this._observers.forEach((observer) => observer(this._state));
  }

  /**
   * Fetch the product details of the given product and loads it into
   * this observable state.\
   * This will notify all observers with the updated state accordingly
   * @param {number} productId - id of the product to load its details
   */
  loadProduct(productId) {
    const storeProduct = store.getState().productOffers.find((p) => p.id === productId);

    this._state = {
      id: productId,
      interestInfo: {
        effective_rate: ['Effective rate', `${storeProduct.effective_interest_rate}% p.a.`],
        nominal_rate: ['Nominal rate', `${storeProduct.nominal_interest_rate}% p.a.`],
        term: ['Term', `${Math.ceil(storeProduct.number_of_terms / 12)} year/s`],
        availability: ['Availability', storeProduct.availability_notice],
        interest_of_early_termination: [
          'Interest in case of early termination',
          storeProduct.early_termination_effective_interest_rate,
        ],
      },
      productDetails: {
        deposit_guarantee: [
          'Deposit guarantee',
          storeProduct.cms_content.deposit_insurance_name.value,
        ],
        currency: ['Currency', storeProduct.currency],
        investment_amount: [
          'Min/Max investment amount',
          `${storeProduct.min_placement_amount} / ${storeProduct.max_placement_amount}`,
        ],
        withholding_tax: ['Withholding tax', String(storeProduct.tax_number_required)],
      },
    };

    this._notify();
  }

  /**
   * @param {(state: State | null) => void} cb - callback function to call when the state changes
   */
  subscribe(cb) {
    /**
     * when subscribing to the update event, immediately call the
     * callback so that the subscriber matches its internal state to the
     * observable state
     */
    cb(this._state);
    this._observers.push(cb);
  }

  /**
   * @param {(state: State | null) => void} cb - callback function to call when the state changes
   */
  unsubscribe(cb) {
    this._observers = this._observers.filter((sub) => sub !== cb);
  }

  /**
   * Removes all observers and reset this observable's state
   */
  cleanup() {
    this._observers = [];
    this._state = null;
  }
}

export default ProductDetailsObservable;
