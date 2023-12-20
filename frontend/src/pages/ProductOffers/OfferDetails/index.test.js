import React from 'react';
import { render, cleanup, act, fireEvent } from '@testing-library/react';

import ProductOffersResponse from '../../../../__mocks__/product-offers_response.json';
import store from '../../../store';
import initialState from '../../../store/state';
import ProductDetailsObservable from '../ProductDetailsObservable';
import OfferDetails from '.';

jest.spyOn(store, 'getState').mockImplementation(() => ({
  ...initialState,
  productOffers: ProductOffersResponse,
}));

afterEach(cleanup);

describe('<OfferDetails />', () => {
  it('subscribe to the observable prop and unsubscribe when unmounted', () => {
    const observable = {
      subscribe: jest.fn(),
      unsubscribe: jest.fn(),
    };

    render(<OfferDetails productDetailsObservable={observable} />);
    expect(observable.subscribe).toHaveBeenCalled();

    cleanup();
    expect(observable.unsubscribe).toHaveBeenCalled();
  });

  it('renders an open modal with modal-content when the observable has product-details', async () => {
    const observable = new ProductDetailsObservable();

    const { container } = render(<OfferDetails productDetailsObservable={observable} />);

    expect(container.querySelector('.modal').className).not.toMatch(/open/);
    expect(container.querySelector('.modalContent')).toBe(null);

    act(() => observable.loadProduct('JTB009'));

    expect(container.querySelector('.modal').className).toMatch(/open/);
    expect(container.querySelector('.modalContent')).not.toBe(null);
  });

  it('clear product info when X button is pressed', () => {
    const observable = new ProductDetailsObservable();
    
    observable.loadProduct('JTB009');
    const { container, getByRole } = render(<OfferDetails productDetailsObservable={observable} />);

    expect(container.querySelector('.modalContent')).not.toBe(null);
    
    fireEvent.click(getByRole('button'));

    expect(container.querySelector('.modalContent')).toBe(null);
  });
});
