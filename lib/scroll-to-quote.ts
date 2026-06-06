const HEADER_OFFSET_PX = 96;

/** Scroll to the homepage instant-quote form (accounts for sticky header). */
export function scrollToInstantQuote() {
  const target =
    document.getElementById("instant-quote") ??
    document.getElementById("quote");
  if (!target) return;

  const top =
    target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET_PX;
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });

  window.history.replaceState(
    null,
    "",
    `${window.location.pathname}${window.location.search}#instant-quote`,
  );
}
