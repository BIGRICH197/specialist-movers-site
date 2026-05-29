import fs from "fs";
import path from "path";
import { trustindexDefaults } from "@/lib/trustindex-config";

export type TrustindexEmbedData = {
  templateId: string;
  templateHtml: string;
  loaderSrc: string;
  cssUrl: string;
};

function readLocalTemplate(): string {
  const file = path.join(process.cwd(), "lib", "trustindex-widget-template.html");
  return fs.readFileSync(file, "utf8").trim();
}

function parseEmbedFromHtml(html: string): TrustindexEmbedData | null {
  const templateMatch = html.match(
    /<template id="trustindex-google-widget-html">([\s\S]*?)<\/template>/,
  );
  if (!templateMatch) return null;

  const cssMatch = html.match(/data-css-url="([^"]+)"/);
  const loaderMatch = html.match(/data-src="([^"]*loader\.js[^"]*)"/);

  return {
    templateId: trustindexDefaults.templateId,
    templateHtml: templateMatch[1].trim(),
    loaderSrc: loaderMatch?.[1] ?? trustindexDefaults.loaderSrc,
    cssUrl: cssMatch?.[1] ?? trustindexDefaults.cssUrl,
  };
}

/**
 * Load Trustindex widget markup (template + loader URLs).
 * Prefer TRUSTINDEX_EMBED_URL when set , use a WP page that only contains the shortcode.
 */
export async function getTrustindexEmbed(): Promise<TrustindexEmbedData> {
  const url = trustindexDefaults.embedPageUrl;

  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const html = await res.text();
      const parsed = parseEmbedFromHtml(html);
      if (parsed) return parsed;
    }
  } catch {
    /* fall through to local template */
  }

  return {
    templateId: trustindexDefaults.templateId,
    templateHtml: readLocalTemplate(),
    loaderSrc: trustindexDefaults.loaderSrc,
    cssUrl: trustindexDefaults.cssUrl,
  };
}
