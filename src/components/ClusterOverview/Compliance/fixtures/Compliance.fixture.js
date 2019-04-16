import { Compliance } from '../Compliance';

export const complianceData = {
  data: {
    healthy: true,
    message: 'All nodes compliant',
  },
  loaded: true,
};

export default [
  {
    component: Compliance,
    props: { ...complianceData },
  },
];
