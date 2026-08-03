import { siteUrl } from "@/lib/site-config";

/**
 * Hand-rolled rather than Next's MetadataRoute.Robots, because that API cannot
 * emit the Content-Signal line (L4) — a machine-readable statement that we
 * want to be read and cited, not just crawled.
 *
 * L3: OAI-SearchBot, ChatGPT-User and Perplexity-User are named explicitly.
 * All three were already allowed via the wildcard, so this is hardening rather
 * than a fix — but OAI-SearchBot is the bot behind ChatGPT search citations
 * and is a different agent from GPTBot, so it is worth being explicit.
 *
 * Also fixes a real leak: /logo-lab was disallowed only under User-agent: *,
 * which meant every named AI bot was free to crawl it. Almost certainly not
 * intended.
 */

const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
] as const;

const DISALLOW = ["/api/", "/logo-lab", "/admin/", "/quote/", "/portal"];

function block(userAgent: string): string {
  return [
    `User-agent: ${userAgent}`,
    "Allow: /",
    ...DISALLOW.map((path) => `Disallow: ${path}`),
  ].join("\n");
}

export const dynamic = "force-static";

export function GET() {
  const body = [
    "# Specialist Movers (KB Logistics Limited)",
    "# We want to be read, quoted and cited by AI assistants.",
    "",
    "Content-Signal: search=yes, ai-train=yes, ai-input=yes",
    "",
    block("*"),
    "",
    ...AI_CRAWLERS.flatMap((ua) => [block(ua), ""]),
    `Sitemap: ${siteUrl}/sitemap.xml`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
