import type { AppRoute } from '@genesislcap/foundation-shell/app';
import { css, customElement, FASTElement, html } from '@microsoft/fast-element';

/**
 * @internal
 */
const notificationsDashboardTemplate = html`
  <section>
    <header>
      <zero-button @click=${(x) => x.$emit('change-alert-rules-display', true)}>
        Show Alerts rules List
      </zero-button>
    </header>
    <foundation-notification-dashboard></foundation-notification-dashboard>
  </section>
`;

/**
 * @internal
 */
const notificationsDashboardStyles = css`
  :host,
  section {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
  }

  header {
    width: 100%;
    text-align: center;
  }

  .wrapper {
    overflow: hidden;
    flex-grow: 1;
    width: 400px;
  }

  .wrapper-scroll {
    max-height: 400px;
    overflow-y: auto;
  }

  zero-modal::part(dialog) {
    padding: 0;
  }

  zero-modal.edit .wrapper,
  zero-modal.add .wrapper {
    padding: 32px 12px;
  }
`;

/**
 * @internal
 */
@customElement({
  name: 'notifications-dashboard',
  template: notificationsDashboardTemplate,
  styles: notificationsDashboardStyles,
})
class Notifications extends FASTElement {}

/**
 * @public
 */
export const notificationsDashboard: AppRoute = {
  title: 'Notifications Dashboard',
  path: 'notifications-dashboard',
  name: 'notifications-dashboard',
  element: Notifications,
  settings: { autoAuth: true },
  navItems: [
    {
      navId: 'header',
      title: 'Notifications',
      icon: {
        name: 'bell',
        variant: 'solid',
      },
      placementIndex: 65,
    },
  ],
};
