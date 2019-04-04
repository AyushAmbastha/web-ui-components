import React from 'react';

import { StorageOverview as StorageOverviewComponent } from '../StorageOverview';
import { cephCluster } from '../Details/fixtures/Details.fixture';
import { ocsHealthData } from '../OCSHealth/fixtures/Health.fixture';

import { ClusterOverviewContext } from '../../ClusterOverview/ClusterOverviewContext';

import { localhostNode } from '../../../tests/mocks/node';
import { cloudInitTestPod } from '../../../tests/mocks/pod/cloudInitTestPod.mock';
import { persistentVolumeClaims } from '../../../tests/mocks/persistentVolumeClaim';
import { cloudInitTestVm } from '../../../tests/mocks/vm/cloudInitTestVm.mock';
import { fullVm } from '../../../tests/mocks/vm/vm.mock';

export const nodes = [localhostNode];
export const pvcs = persistentVolumeClaims;
export const pods = [cloudInitTestPod];
export const vms = [fullVm, cloudInitTestVm];
export const migrations = [];
export const pvs = [];


const StorageOverview = props => (
  <ClusterOverviewContext.Provider value={props}>
    <StorageOverviewComponent />
  </ClusterOverviewContext.Provider>
);

 export default [
  {
    component: StorageOverview,
    props: {
      cephCluster,
      ocsHealthData,
      nodes,
      pvcs,
      pvs,
      pods,
      vms,
      migrations,
    },
  },
];
