import { FoundationAlerts } from '@genesislcap/foundation-alerts';
import type { AppRegistrationContext } from '@genesislcap/foundation-shell/app';
import { NotificationDashboard } from '@genesislcap/pbc-notify';

/**
 * @privateRemarks
 * The try catch here is just to demo design system interaction.
 *
 * @public
 */
export async function registerAlerts(context: AppRegistrationContext) {
  try {
    /**
     * const { provideDesignSystem } = context.designSystem;
     * provideDesignSystem().register(foundationAlerts);
     */
    FoundationAlerts;
  } catch (e) {
    console.error('Error registering alerts', e);
  }
}

/**
 * @public
 */
export async function registerDashboard() {
  NotificationDashboard;
}

