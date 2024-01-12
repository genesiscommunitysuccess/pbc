import type { NavEventDetailMap } from '@genesislcap/foundation-header';
import type { AppStore } from '@genesislcap/foundation-shell/app';
import { AbstractStore, registerStore, Store } from '@genesislcap/foundation-store';
import { observable } from '@microsoft/fast-element';
import { DI } from '@microsoft/fast-foundation';

/**
 * These could be broken out into alerts, inbox etc. Basically whatever is a separate package, or a separate answer in
 * the prompts. For now, we're combining both here.
 *
 * Fragments included here are based on build time info like addAlerts: true, and beyond that, each AppStore can have
 * a predicate function to assess runtime context, like the env, user etc.
 */

export interface NotifyStore extends Store {
  readonly inboxDisplayState: boolean;
  readonly alertsRulesDisplayState: boolean;
}

export type NotifyEventMap = Pick<NavEventDetailMap, 'notification-icon-clicked'> & {
  'change-inbox-display': boolean;
  'change-alert-rules-display': boolean;
};

export class DefaultNotifyStore
  extends AbstractStore<NotifyStore, NotifyEventMap>
  implements NotifyStore
{
  @observable inboxDisplayState: boolean = false;
  @observable alertsRulesDisplayState: boolean = false;

  constructor() {
    super();
    this.createListener<boolean>('change-alert-rules-display', (displayState) => {
      this.commit.alertsRulesDisplayState = displayState;
    });

    /**
     * Stores support creating multiple listeners for the same key, so we can piggyback on events to drive other logic.
     * Note that `type` indicates the trigger event. Keeping for user reference, but could be split here.
     */
    this.createListener<boolean | null>(
      ['change-inbox-display', 'notification-icon-clicked'],
      (_, { detail, type }) => {
        /**
         * Account for `'notification-icon-clicked': void;` which has a `null` detail payload. Prior logic proxied that
         * event to a `change-inbox-display` event with a `true` detail payload, so replicating here.
         */
        this.commit.inboxDisplayState = detail === null ? true : detail;
      },
    );
  }
}

export const NotifyStore = registerStore<NotifyStore>(DefaultNotifyStore, 'NotifyStore');

export function getNotifyStore(): NotifyStore {
  return DI.getOrCreateDOMContainer().get(NotifyStore);
}

export const notifyAppStore: AppStore<NotifyStore> = {
  store: getNotifyStore(),
};
