import { Inventory } from '../Inventory';
import { nodes, pvcs, pvs, pods, vms, migrations } from '../../fixtures/StorageOverview.fixture';
import { cephCluster } from '../../Details/fixtures/Details.fixture';

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
