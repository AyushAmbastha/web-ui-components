import { Details } from '../Details';


export const cephCluster = [
    {
      metadata: {
        name: 'rook-ceph',
      },
    },
];


export default [
  {
    component: Details,
    props: { cephCluster },
  },
  {
    component: Details,
    name: 'Loading cluster details',
  },
];
