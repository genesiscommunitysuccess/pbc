import type { AppMetadata } from '@genesislcap/foundation-shell/app';

/**
 * @public
 */
export const metadata: AppMetadata = {
  name: '@genesiscommunitysuccess/pbc-reporting',
  description: 'Genesis Reporting PBC',
  version: '1.0.0',
  prerequisites: {
    '@genesislcap/foundation-ui': '14.127.6-pbc-demo.3',
    gsf: '7.1.0-SNAPSHOT',
  },
  dependencies: {
    '@genesislcap/pbc-reporting': '1.0.0',
    serverDepId: '7.1.0-SNAPSHOT',
  },
};
