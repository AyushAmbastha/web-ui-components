import { Inventory } from '../Inventory';
import { nodes, pvcs, pvs, pods, vms, vmis, migrations } from '../../fixtures/StorageOverview.fixture';

export default [
  {
    component: Inventory,
    props: {
      nodes,
      pvcs,
      pvs,
      pods,
      vms,
      vmis,
      migrations,
    },
  },
  {
    name: 'loading',
    component: Inventory,
    props: {},
  },
];
