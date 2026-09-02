// @docusaurus/plugin-google-gtag calls window.gtag(...) directly on every
// client-side route change with no existence check. Ad blockers and privacy
// extensions often strip the inline gtag stub script (by content, not just
// by URL), which leaves window.gtag undefined and throws
// "window.gtag is not a function" when navigating between pages. Installing
// a no-op fallback here, before any route change can fire, keeps navigation
// working regardless of what a visitor's browser blocked.
if (typeof window !== "undefined") {
  window.gtag =
    window.gtag ||
    function gtag(...args) {
      (window.dataLayer = window.dataLayer || []).push(args);
    };
}
