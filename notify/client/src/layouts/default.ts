{{#if addAlerts}}
const alertsHTML = html`
    <zero-flyout position="right">
        <foundation-alerts></foundation-alerts>
    </zero-flyout>
`
const alertsCSS = css`
    foundation-alerts {
        --design-unit: 2.5;
        --stroke-width: 1;
    }

    foundation-alerts::part(filter-button) {
      --design-unit: 4;
    }
`;
{{/if}}
