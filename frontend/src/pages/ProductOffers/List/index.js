import React from 'react';
import { connect } from 'react-redux';
import { openAccount } from '../../../store/actions';
import OfferCard from '../OfferCard';

const List = props => {
  const ctaClickHandler = offer => {
    props.openAccount(offer.id);
  };

  const ctaProductDetailsHandler = offer => {
    props.productDetailsObservable.loadProduct(offer.id);
  }

  return (
    <ul className="offersListWrapper">
      {props.offers.map(offer => (
        <li key={offer.id}>
          <OfferCard
            ctaClick={ctaClickHandler}
            ctaProductDetails={ctaProductDetailsHandler}
            offer={offer} />
        </li>
      ))}
    </ul>
  );
};

const mapDispatchToProps = dispatch => ({
  openAccount: offerId => dispatch(openAccount(offerId)),
});

export default connect(
  null,
  mapDispatchToProps,
)(List);
