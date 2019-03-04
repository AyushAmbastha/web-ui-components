import React from 'react';
import { get } from 'lodash';

import PropTypes from 'prop-types';

import { getResource } from '../../../../utils';
import { V2VVMwareModel } from '../../../../models';
import { Dropdown } from '../../../Form';

import { PROVIDER_SELECT_VM } from '../strings';
import { NAMESPACE_KEY, PROVIDER_VMWARE_CONNECTION, PROVIDER_VMWARE_USER_PWD_AND_CHECK_KEY } from '../constants';
import { settingsValue } from '../../../../k8s/selectors';

import VCenterVmsWithPrefill from './VCenterVmsWithPrefill';

const VCenterVms = ({ onChange, onFormChange, id, value, extraProps, ...extra }) => {
  // the "value" is name of selected VMWare VM
  const { WithResources, basicSettings } = extraProps;

  const v2vvmwareName = get(basicSettings, [
    PROVIDER_VMWARE_USER_PWD_AND_CHECK_KEY,
    'value',
    PROVIDER_VMWARE_CONNECTION,
    'V2VVmwareName',
  ]);

  if (!v2vvmwareName) {
    return <Dropdown id={id} value={PROVIDER_SELECT_VM} disabled />;
  }

  const resourceMap = {
    v2vvmware: {
      resource: getResource(V2VVMwareModel, {
        name: v2vvmwareName,
        namespace: settingsValue(basicSettings, NAMESPACE_KEY),
        isList: false,
      }),
    },
  };
  const resourceToProps = ({ v2vvmware }) => {
    const vms = get(v2vvmware, 'spec.vms');
    let choices = [];
    if (vms) {
      choices = vms.map(vm => vm.name);
    }

    return {
      choices, // value set by the controller
      disabled: !vms,
    };
  };

  return (
    <WithResources resourceMap={resourceMap} resourceToProps={resourceToProps}>
      <VCenterVmsWithPrefill
        id={id}
        value={value}
        onChange={onChange}
        onFormChange={onFormChange}
        basicSettings={basicSettings}
      />
    </WithResources>
  );
};
VCenterVms.defaultProps = {
  id: undefined,
  value: undefined,
};
VCenterVms.propTypes = {
  onChange: PropTypes.func.isRequired,
  extraProps: PropTypes.object.isRequired,
  onFormChange: PropTypes.func.isRequired,
  id: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default VCenterVms;
