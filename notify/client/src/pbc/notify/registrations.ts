import { FoundationAlerts } from '@genesislcap/foundation-alerts';
import { FoundationInbox } from '@genesislcap/foundation-inbox';
import type { AppRegistrationContext } from '@genesislcap/foundation-shell/app';
import { NotificationDashboard } from '@genesislcap/pbc-notify';

/**
 * @privateRemarks
 * The try catch here is just to demo design system interaction.
 *
 * @public
 */
export async function register(context: AppRegistrationContext) {
  try {
    /**
     * const { provideDesignSystem } = context.designSystem;
     * provideDesignSystem().register(foundationAlerts);
     */
    NotificationDashboard;
    FoundationAlerts;
    FoundationInbox;
  } catch (e) {
    console.error('Error registering notify', e);
  }
}
