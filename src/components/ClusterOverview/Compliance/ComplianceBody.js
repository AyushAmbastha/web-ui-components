import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'patternfly-react';

const healtyIcon = <Icon type="fa" name="check-circle" className="kubevirt-health__icon--ok" />;

const errorIcon = <Icon type="fa" name="exclamation-triangle" className="kubevirt-health__icon--error" />;

const ComplianceBody = ({ data }) => (
  <React.Fragment>
    <div className="kubevirt-health__icon">
      {data.healthy ? healtyIcon : errorIcon}
      <span className="kubevirt-health__text">{data.message}</span>
    </div>
  </React.Fragment>
);

ComplianceBody.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ComplianceBody;
