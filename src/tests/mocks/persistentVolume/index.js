export const persistentVolumes = [
  {
    metadata: {
      // should be the same namespaces as the vm
      name: 'disk-one_pv',
      namespace: 'default',
    },
    spec: {
      capacity: {
        storage: '10gi',
      },
      storageClassName: 'nfs',
    },
  },
  {
    metadata: {
      name: 'disk-two_pv',
      namespace: 'myproject',
    },
    spec: {
      capacity: {
        storage: '15gi',
      },
      storageClassName: 'glusterfs',
    },
  },
  {
    metadata: {
      name: 'disk-three_pv',
      namespace: 'default',
    },
    spec: {
      capacity: {
        storage: '20gi',
      },
      storageClassName: 'iscsi',
    },
  },
  {
    metadata: {
      name: 'datavolume-url-success_pv',
      namespace: 'default',
    },
    spec: {
      capacity: {
        storage: '20gi',
      },
      storageClassName: 'iscsi',
    },
  },
  {
    metadata: {
      name: 'datavolume-blank_pv',
      namespace: 'default',
    },
    spec: {
      capacity: {
        storage: '20gi',
      },
      storageClassName: 'iscsi',
    },
  },
];
