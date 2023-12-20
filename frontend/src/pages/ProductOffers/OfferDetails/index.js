import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';

/** * @typedef {import('../ProductDetailsObservable').State} State */

const OfferDetails = (props) => {
  /** * @type {[State, Function]} */
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const observer = (product) => setProduct(product);

    props.productDetailsObservable.subscribe(observer);
    return () => props.productDetailsObservable.unsubscribe(observer);
  }, [props.productDetailsObservable, setProduct]);

  const closeHandler = () => setProduct(null);

  return (
    <div className={`${styles.modal} ${product ? styles.open : ''}`}>
      {product ? (
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h2 className={styles.headerTitle}>Product Details</h2>

            <button onClick={closeHandler}>
              <span className={styles.close}>
                &times;
              </span>
            </button>
          </div>

          <div className={styles.modalBody}>
            <div>
              <h2 className={styles.title}>Interest Information</h2>

              {Object.entries(product.interestInfo).map(([key, value]) => (
                <div key={key} className={styles.row}>
                  <div>{value[0]}</div>
                  <div>{value[1]}</div>
                </div>
              ))}
            </div>

            <div>
              <h2 className={styles.title}>Product Details</h2>

              {Object.entries(product.productDetails).map(([key, value]) => (
                <div key={key} className={styles.row}>
                  <div>{value[0]}</div>
                  <div>{value[1]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default OfferDetails;
