import { Inventory } from '../Inventory';
import { nodes, pvcs, pvs, pods, vms, cephCluster, migrations } from '../../fixtures/StorageOverview.fixture';

export default [
  {
    component: Inventory,
    props: {
      nodes,
      pvcs,
      pvs,
      pods,
      vms,
      cephCluster,
      migrations,
    },
  },
  {
    name: 'loading',
    component: Inventory,
    props: {},
  },
];
