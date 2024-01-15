import type { AppStyle } from '@genesislcap/foundation-shell/app';
import { css } from '@microsoft/fast-element';

/**
 * @privateRemarks
 * This one was to cross-check main targeting via notify was working, nav-height change not required here.
 * @public
 */
export const main: AppStyle = {
  targetId: 'main',
  styles: css`
    :host {
      --nav-height: 60px;
    }
  `,
};

/**
 * @public
 */
export const alerts: AppStyle = {
  targetId: 'layout',
  styles: css`
    foundation-alerts {
      --design-unit: 2.5;
      --stroke-width: 1;
    }

    foundation-alerts::part(filter-button) {
      --design-unit: 4;
    }
  `,
};

/**
 * @public
 */
export const notificationsButton: AppStyle = {
  targetId: 'header',
  styles: css`
    foundation-inbox-counter {
      z-index: 999;
      position: absolute;
      top: 10px;
      right: -3px;
      pointer-events: none;
    }
  `,
};
