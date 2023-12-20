import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductOffers } from '../../store/actions';
import List from './List';
import styles from './styles.module.scss';
import OfferDetails from './OfferDetails';
import ProductDetailsObservable from './ProductDetailsObservable';

const ProductOffers = () => {
  const dispatch = useDispatch();
  const offers = useSelector((state) => state.productOffers);

  const productDetailsObservable = React.useRef(new ProductDetailsObservable()).current;

  useEffect(() => {
    return () => productDetailsObservable.cleanup();
  }, [productDetailsObservable]);

  useEffect(() => {
    dispatch(fetchProductOffers());
  }, [dispatch]);

  return offers.length ? (
    <div className={styles.container}>
      <OfferDetails {...{ productDetailsObservable }} />
      <List {...{ productDetailsObservable, offers }} />
    </div>
  ) : null;
};

export default ProductOffers;
