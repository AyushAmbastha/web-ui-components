import { complianceData } from './Compliance.fixture';

import ComplianceBody from '../ComplianceBody';

export default [
  {
    component: ComplianceBody,
    props: { ...complianceData },
  },
];
