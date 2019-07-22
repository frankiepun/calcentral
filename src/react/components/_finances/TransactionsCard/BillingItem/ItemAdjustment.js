import React from 'react';
import PropTypes from 'prop-types';

import formatCurrency from 'functions/formatCurrency';
import formatDate from 'functions/formatDate';
import 'icons/disc-inactive.svg';
import 'icons/disc-active.svg';
import 'icons/timeline-top-cap.svg';
import 'icons/timeline-bottom-cap.svg';
import 'icons/timeline-center-blue.svg';
import 'icons/timeline-center.svg';
import 'icons/timeline-empty.svg';
import './ItemAdjustment.scss';

import { chargeTypes } from '../types';

import parseDate from 'date-fns/parse';

const directionForAdjustment = ({ type, amount }) => {
  if (chargeTypes.has(type)) {
    return amount > 0 ? 'Increased by' : 'Decreased by';
  } else {
    return amount < 0 ? 'Increased by' : 'Decreased by';
  }
};

export const GenericAdjustment = ({ className, description, date }) => {
  return (
    <div className={`ItemAdjustment ${className}`}>
      <div className="ItemAdjustment__date">
        { formatDate(date) }
      </div>
      <div className="ItemAdjustment__description">
        {description}
      </div>
    </div>
  );
};
GenericAdjustment.propTypes = {
  className: PropTypes.string,
  description: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired
};

const ItemAdjustment = ({ adjustment }) => {
  const date = parseDate(adjustment.posted);
  const direction = directionForAdjustment(adjustment);
  const amount = Math.abs(adjustment.amount);
  const description = `${direction} ${formatCurrency(amount)}`;

  return <GenericAdjustment className="ItemAdjustment--change" date={date} description={description} />;
};
ItemAdjustment.propTypes = {
  adjustment: PropTypes.object
};

export default ItemAdjustment;
