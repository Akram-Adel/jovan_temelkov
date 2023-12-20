import ProductOffersResponse from '../../../__mocks__/product-offers_response.json';
import store from '../../store';
import initialState from '../../store/state';
import ProductDetailsObservable from './ProductDetailsObservable';

jest.spyOn(store, 'getState').mockImplementation(() => ({
  ...initialState,
  productOffers: ProductOffersResponse,
}));

describe('ProductDetailsObservable', () => {
  it('notifies observers when a new product is loaded', () => {
    const observable = new ProductDetailsObservable();
    const notifySpy = jest.spyOn(observable, '_notify');

    observable.loadProduct('JTB009');

    expect(notifySpy).toHaveBeenCalled();
  });

  it('formats product-offer into state correctly', () => {
    const observable = new ProductDetailsObservable();
    observable.loadProduct('JTB009');

    observable.subscribe((state) => {
      expect(state).toMatchSnapshot();
    });
  });

  it('subscribe and unsubscribe correctly', () => {
    const observable = new ProductDetailsObservable();
    expect(observable._observers).toEqual([]);

    const observer = jest.fn();
    observable.subscribe(observer);
    expect(observable._observers).toEqual([observer]);

    observable.unsubscribe(observer);
    expect(observable._observers).toEqual([]);
  });

  it('cleanup observers and state correctly', () => {
    const observable = new ProductDetailsObservable();

    observable.loadProduct('JTB009');
    observable.subscribe(() => null);
    observable.subscribe(() => null);

    expect(observable._observers.length).not.toEqual(0);
    expect(observable._state).not.toBeNull();
    
    observable.cleanup();
    expect(observable._observers.length).toEqual(0);
    expect(observable._state).toBeNull();
  });
});
