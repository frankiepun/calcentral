import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import formatCurrency from 'functions/formatCurrency';
import dueLabel from './dueLabel';

import {
  CHARGE_OVERDUE,
  CHARGE_DUE,
  CHARGE_NOT_DUE
} from '../chargeStatuses';

import DueAmountBadge from '../Badges/DueAmountBadge';

const ChargeAmountDue = ({ item }) => {
  switch (item.status) {
    case CHARGE_OVERDUE:
    case CHARGE_DUE:
    case CHARGE_NOT_DUE:
      return (
        <Fragment>
          <DueAmountBadge amount={item.amount_due} status={item.status} />
          <div>{ dueLabel(item.due_date) }</div>
        </Fragment>
      );
    default:
      if (item.amount_due > 0) {
        return (
          <Fragment>
            {formatCurrency(item.amount_due)}
            <div>{ dueLabel(item.due_date) }</div>
          </Fragment>
        );
      }

      return null;
  }
};

ChargeAmountDue.propTypes = {
  item: PropTypes.object
};

export default ChargeAmountDue;
