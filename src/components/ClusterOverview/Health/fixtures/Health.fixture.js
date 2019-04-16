import { Health } from '../Health';

export const healthData = {
  data: {
    healthy: 0,
    message: 'Error message',
  },
  loaded: true,
};

export default [
  {
    component: Health,
    props: { ...healthData },
  },
];
