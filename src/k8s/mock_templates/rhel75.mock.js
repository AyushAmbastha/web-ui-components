export const rhel75 = {
  apiVersion: 'template.openshift.io/v1',
  kind: 'Template',
  metadata: {
    name: 'rhel-generic',
    namespace: 'default',
    annotations: {
      'openshift.io/display-name': 'Red Hat Enterprise Linux 7.0+ VM',
      description:
        'This template can be used to create a VM suitable for Red Hat Enterprise Linux 7 and newer. The template assumes that a PVC is available which is providing the necessary RHEL disk image.',
      tags: 'kubevirt,virtualmachine,linux,rhel',
      iconClass: 'icon-rhel',
      'openshift.io/provider-display-name': 'KubeVirt',
      'openshift.io/documentation-url': 'https://github.com/fabiand/common-templates',
      'openshift.io/support-url': 'https://github.com/fabiand/common-templates/issues',
      'template.openshift.io/bindable': 'false',
      'defaults.template.cnv.io/disk': 'rootdisk',
      'name.os.template.cnv.io/rhel7.0': 'Red Hat Enterprise Linux 7.0',
    },
    labels: {
      'os.template.cnv.io/rhel7.0': 'true',
      'workload.template.cnv.io/generic': 'true',
      'flavor.template.cnv.io/small': 'true',
      'template.cnv.io/type': 'base',
    },
  },
  objects: [
    {
      apiVersion: 'kubevirt.io/v1alpha2',
      kind: 'VirtualMachine',
      metadata: {
        // eslint-disable-next-line no-template-curly-in-string
        name: '${NAME}',
      },
      spec: {
        running: false,
        template: {
          spec: {
            domain: {
              cpu: {
                cores: 2,
              },
              resources: {
                requests: {
                  memory: '2G',
                },
              },
              devices: {
                rng: {},
                disks: [
                  {
                    disk: {
                      bus: 'virtio',
                    },
                    name: 'rootdisk',
                    volumeName: 'rootvolume',
                  },
                  {
                    disk: {
                      bus: 'virtio',
                    },
                    name: 'cloudinitdisk',
                    volumeName: 'cloudinitvolume',
                  },
                ],
              },
            },
            terminationGracePeriodSeconds: 0,
            volumes: [
              {
                name: 'rootvolume',
                persistentVolumeClaim: {
                  // eslint-disable-next-line no-template-curly-in-string
                  claimName: '${PVCNAME}',
                },
              },
              {
                cloudInitNoCloud: {
                  userData: '# configure default password\npassword: fedora\nchpasswd: { expire: False }',
                },
                name: 'cloudinitvolume',
              },
            ],
          },
        },
      },
    },
  ],
  parameters: [
    {
      description: 'Name of the new VM',
      from: '[A-Za-z0-9]{1,16}',
      generate: 'expression',
      name: 'NAME',
    },
    {
      name: 'PVCNAME',
      description: 'Name of the PVC with the disk image',
      required: true,
    },
  ],
};
