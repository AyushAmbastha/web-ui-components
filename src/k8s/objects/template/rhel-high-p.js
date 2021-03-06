export const rhelHighPerformance = {
  apiVersion: 'template.openshift.io/v1',
  kind: 'Template',
  metadata: {
    name: 'rhel-high-performance',
    namespace: 'openshift',
    annotations: {
      'openshift.io/display-name': 'Red Hat Enterprise Linux 7.0+ VM High Performance',
      description:
        'This template can be used to create a VM suitable for Red Hat Enterprise Linux 7 and newer and sets configuration for high performance. That means for example CPU passhtrough, CPU pinning and disabled graphics device. The template assumes that a PVC is available which is providing the necessary RHEL disk image.',
      tags: 'kubevirt,virtualmachine,linux,rhel,high-performance',
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
      'workload.template.cnv.io/high-performance': 'true',
      'flavor.template.cnv.io/medium': 'true',
      'template.cnv.io/type': 'base',
    },
  },
  objects: [
    {
      apiVersion: 'kubevirt.io/v1alpha3',
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
                dedicatedCpuPlacement: true,
                model: 'host-model',
              },
              resources: {
                requests: {
                  memory: '4G',
                },
              },
              devices: {
                autoattachGraphicsDevice: false,
                rng: {},
                disks: [
                  {
                    disk: {
                      bus: 'virtio',
                    },
                    name: 'rootdisk',
                  },
                  {
                    disk: {
                      bus: 'virtio',
                    },
                    name: 'cloudinitdisk',
                  },
                ],
              },
            },
            terminationGracePeriodSeconds: 0,
            volumes: [
              {
                name: 'rootdisk',
                persistentVolumeClaim: {
                  // eslint-disable-next-line no-template-curly-in-string
                  claimName: '${PVCNAME}',
                },
              },
              {
                cloudInitNoCloud: {
                  userData: '# configure default password\npassword: fedora\nchpasswd: { expire: False }',
                },
                name: 'cloudinitdisk',
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
