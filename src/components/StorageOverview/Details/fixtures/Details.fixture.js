import { StorageDetails } from '../Details';

export const cephCluster = [
  {
    metadata: {
      name: 'rook-ceph',
    },
  },
];

export default [
  {
    component: StorageDetails,
    props: { cephCluster },
  },
  {
    component: StorageDetails,
    name: 'Loading cluster details',
  },
];
