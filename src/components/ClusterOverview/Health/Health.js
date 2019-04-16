import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import {
  DashboardCard,
  DashboardCardBody,
  DashboardCardHeader,
  DashboardCardTitle,
} from '../../Dashboard/DashboardCard';
import { ClusterOverviewContextGenericConsumer } from '../ClusterOverviewContext';
import { InlineLoading } from '../../Loading';
import { HEALTHY, ERROR, UNKNOWN } from './strings';
import { HealthItem } from '../../Dashboard/Health/HealthItem';
import { HealthBody } from '../../Dashboard/Health/HealthBody';

const HealthStatus = {
  0: {
    message: HEALTHY,
    iconname: 'check-circle',
    classname: 'ok',
  },
  1: {
    message: ERROR,
    iconname: 'exclamation-triangle',
    classname: 'error',
  },
  2: {
    message: UNKNOWN,
    iconname: 'exclamation-triangle',
    classname: 'error',
  },
};

export const Health = ({ data, loaded }) => {
  const value = get(data, 'healthy', '2');
  const status = HealthStatus[value] || HealthStatus[2];
  return (
    <DashboardCard>
      <DashboardCardHeader>
        <DashboardCardTitle>Cluster Health</DashboardCardTitle>
      </DashboardCardHeader>
      <DashboardCardBody className="kubevirt-health__body" isLoading={!loaded} LoadingComponent={InlineLoading}>
        <HealthBody>
          <HealthItem
            message={data ? status.message : null}
            icon={data ? status.iconname : null}
            classname={data ? status.classname : null}
          />
        </HealthBody>
      </DashboardCardBody>
    </DashboardCard>
  );
};

Health.defaultProps = {
  loaded: false,
};

Health.propTypes = {
  data: PropTypes.object.isRequired,
  loaded: PropTypes.bool,
};

const HealthConnected = () => <ClusterOverviewContextGenericConsumer Component={Health} dataPath="healthData" />;

export default HealthConnected;
