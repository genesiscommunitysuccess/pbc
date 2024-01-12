import type { AppRoute } from '@genesislcap/foundation-shell/app';

/**
 * Reporting route
 * @public
 */
export const reporting: AppRoute = {
  title: 'Reporting',
  path: 'reporting',
  name: 'reporting',
  element: async () => (await import('@genesislcap/pbc-reporting')).Reporting,
  settings: { autoAuth: true, maxRows: 500 },
  navItems: [
    {
      navId: 'header',
      title: 'Reporting',
      icon: {
        name: 'file-csv',
        variant: 'solid',
      },
      placementIndex: 35,
    },
    {
      navId: 'side',
      title: 'Special Report',
      routePath: 'reporting/foo', // < example if there were child routes
      icon: {
        name: 'file-csv',
        variant: 'solid',
      },
    },
  ],
};
