/**
 * Enum for shared CSS class names that are defined globally.
 *
 * The actual style definitions for these classes are located in `global.scss`.
 * This provides a type-safe way to apply global styles from TypeScript,
 * preventing typos and ensuring consistency.
 * @enum {string}
 */
export enum SharedClassNames {
    /**
     * Applies bottom padding to an element, typically the main layout.
     * This is used to account for the UI of standalone (PWA) mode on mobile devices,
     * preventing content from being obscured by system elements like the iOS home bar.
     */
    PbStandalone = "pb-standalone",
}