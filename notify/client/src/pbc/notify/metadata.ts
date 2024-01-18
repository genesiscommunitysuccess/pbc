import type { AppMetadata } from '@genesislcap/foundation-shell/app';

/**
 * @public
 */
export const metadata: AppMetadata = {
  name: '@genesiscommunitysuccess/pbc-notify',
  description: 'Genesis Notify PBC',
  version: '1.0.0',
  prerequisites: {
    '@genesislcap/foundation-ui': '14.134.0',
    gsf: '7.1.0-SNAPSHOT',
  },
  dependencies: {
    '@genesislcap/pbc-notify': '1.0.0',
    '@genesislcap/foundation-alerts': '14.134.0',
    '@genesislcap/foundation-inbox': '14.134.0',
    '@genesislcap/foundation-notifications': '14.134.0',
    serverDepId: '7.1.0-SNAPSHOT',
  },
};
