const HUBSPOT_API_URL = "https://api.hubapi.com";
const PIPELINE_ID = "997404386";
const STAGE_NEW = "1526377150"; // "New" stage in pipeline 997404386
export const STAGE_CLOSED_WON = "1526377155"; // "Closed Won" stage in pipeline 997404386

const OWNER_TAINE = "78086404";
const OWNER_DANIELLE = "159727645";

// Exported so callers (e.g. the chat bot) can force a specific owner.
export const HUBSPOT_OWNERS = { taine: OWNER_TAINE, danielle: OWNER_DANIELLE };

// Every deal is born owned: Hamilton leads go to Danielle, everything else
// to Taine. The pricing engine's branch is checked first — it recognises
// Hamilton suburbs the text signals miss, and the mini PC backstop never
// overrides an owner once set, so a wrong stamp here would stick.
function ownerFor(params: {
  branch?: "auckland" | "hamilton" | "manual";
  sourcePage?: string;
  landingPage?: string;
  pickupAddress: string;
}): string {
  if (params.branch === "hamilton") return OWNER_DANIELLE;
  const page = params.sourcePage || params.landingPage || "";
  if (page.toLowerCase().includes("hamilton")) return OWNER_DANIELLE;
  if (/\bhamilton\b/i.test(params.pickupAddress)) return OWNER_DANIELLE;
  return OWNER_TAINE;
}

// job_source is a dropdown — only these values are accepted by HubSpot.
// Service types without a matching option get no job_source.
function jobSourceFor(serviceType: string): string | null {
  const s = serviceType.toLowerCase();
  if (s.includes("piano")) return "website_piano";
  if (s.includes("office") || s.includes("commercial")) return "commercial_job";
  if (s.includes("house") || s.includes("home")) return "website_house_move";
  return null;
}

// dealtype is a dropdown: moversgeneral, moverspiano, cleaning (plus international).
function dealTypeFor(serviceType: string): string | null {
  const s = serviceType.toLowerCase();
  if (s.includes("piano")) return "moverspiano";
  if (s.includes("clean")) return "cleaning";
  if (
    s.includes("house") ||
    s.includes("home") ||
    s.includes("office") ||
    s.includes("commercial") ||
    s.includes("hard") ||
    s.includes("shift")
  ) {
    return "moversgeneral";
  }
  return null;
}

function getToken(): string {
  // Strip BOM and whitespace — a stray invisible character in the env var
  // makes the Authorization header invalid and every request fail.
  const token = process.env.HUBSPOT_ACCESS_TOKEN?.replace(/^\uFEFF/, "").trim();
  if (!token) throw new Error("HUBSPOT_ACCESS_TOKEN not set");
  return token;
}

async function hubspotFetch(path: string, opts: RequestInit = {}) {
  const res = await fetch(`${HUBSPOT_API_URL}${path}`, {
    ...opts,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
      ...opts.headers,
    },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error(`HubSpot API error ${res.status}: ${body}`);
    return null;
  }
  return res.json();
}

async function findOrCreateContact(params: {
  name: string;
  phone: string;
  email?: string;
}): Promise<string | null> {
  const [firstname, ...rest] = params.name.trim().split(/\s+/);
  const lastname = rest.join(" ") || "";

  // Try find by email first, then phone
  if (params.email) {
    const search = await hubspotFetch("/crm/v3/objects/contacts/search", {
      method: "POST",
      body: JSON.stringify({
        filterGroups: [
          { filters: [{ propertyName: "email", operator: "EQ", value: params.email }] },
        ],
      }),
    });
    if (search?.results?.length > 0) return search.results[0].id;
  }

  // Create new contact
  const properties: Record<string, string> = {
    firstname,
    lastname,
    phone: params.phone,
  };
  if (params.email) properties.email = params.email;

  const created = await hubspotFetch("/crm/v3/objects/contacts", {
    method: "POST",
    body: JSON.stringify({ properties }),
  });
  return created?.id ?? null;
}

export async function createHubSpotDeal(params: {
  name: string;
  phone: string;
  email?: string;
  serviceType: string;
  pickupAddress: string;
  dropoffAddress: string;
  preferredDate?: string;
  estimatedValue?: number;
  notes?: string;
  /** Bedroom count from the house/cleaning forms. */
  bedrooms?: number;
  /** Quote branch from the pricing engine — "manual" maps to out_of_town. */
  branch?: "auckland" | "hamilton" | "manual";
  /** Page path the form was submitted from, e.g. /hamilton/piano-movers. */
  sourcePage?: string;
  pickupAccess?: string;
  dropoffAccess?: string;
  addOns?: string[];
  /** Price window shown to the customer, e.g. "$2,450 to $2,890 incl GST". */
  quoteRange?: string;
  /** e.g. "Paid Search - Google Ads", "Organic Search - Google", "Direct". */
  trafficSource?: string;
  /** First page of the visit, with query string. */
  landingPage?: string;
  /** Extra attribution detail (campaign, gclid, referrer) for the note. */
  attributionNote?: string;
  /** Route-specific deal properties (must already exist in HubSpot). */
  extraProperties?: Record<string, string>;
  /** Where the lead came from — shown in the deal title and note so it is
   *  findable, e.g. "Chat Bot". Defaults to "Website Quote". */
  source?: string;
  /** Force a specific HubSpot owner id, overriding the branch-based routing
   *  in ownerFor (e.g. chat-bot leads always go to Danielle). */
  ownerId?: string;
  /** Deal stage id to create at. Defaults to "New"; book-ins pass
   *  STAGE_CLOSED_WON so a job booked in without a prior deal lands as won. */
  dealStage?: string;
}): Promise<{ dealId: string } | { error: string }> {
  try {
    const contactId = await findOrCreateContact({
      name: params.name,
      phone: params.phone,
      email: params.email,
    });

    const source = params.source?.trim() || "Website Quote";
    const fullName = params.name.trim();
    const dealName = `[${params.serviceType}] ${fullName} - ${source}`;

    const properties: Record<string, string> = {
      dealname: dealName,
      pipeline: PIPELINE_ID,
      dealstage: params.dealStage || STAGE_NEW,
      pick_up_deal: params.pickupAddress,
      drop_off_deal: params.dropoffAddress,
      hubspot_owner_id: params.ownerId || ownerFor(params),
    };
    const jobSource = jobSourceFor(params.serviceType);
    if (jobSource) properties.job_source = jobSource;
    const dealType = dealTypeFor(params.serviceType);
    if (dealType) properties.dealtype = dealType;
    if (params.preferredDate) {
      properties.deal_preferred_date = params.preferredDate;
    }
    if (params.estimatedValue) {
      properties.amount = String(params.estimatedValue);
    }
    if (params.bedrooms) {
      properties.number_bedrooms = String(params.bedrooms);
    }
    if (params.branch) {
      properties.branch =
        params.branch === "manual" ? "out_of_town" : params.branch;
    }
    if (params.sourcePage) {
      properties.website_source_page = params.sourcePage;
    }
    if (params.pickupAccess) {
      properties.pickup_access = params.pickupAccess;
    }
    if (params.dropoffAccess) {
      properties.drop_off_access = params.dropoffAccess;
    }
    if (params.addOns?.length) {
      properties.website_add_ons = params.addOns.join(", ");
    }
    if (params.quoteRange) {
      properties.website_quote_range = params.quoteRange;
    }
    if (params.trafficSource) {
      properties.website_traffic_source = params.trafficSource;
    }
    if (params.landingPage) {
      properties.website_landing_page = params.landingPage.slice(0, 500);
    }
    if (params.extraProperties) {
      Object.assign(properties, params.extraProperties);
    }

    let deal = await hubspotFetch("/crm/v3/objects/deals", {
      method: "POST",
      body: JSON.stringify({ properties }),
    });

    // An unowned deal beats a lost lead — if the create failed with an
    // owner set, retry once without it.
    if (!deal?.id && properties.hubspot_owner_id) {
      console.error(
        "Deal create failed with hubspot_owner_id set — retrying without owner",
      );
      delete properties.hubspot_owner_id;
      deal = await hubspotFetch("/crm/v3/objects/deals", {
        method: "POST",
        body: JSON.stringify({ properties }),
      });
    }

    if (!deal?.id) return { error: "Failed to create deal" };

    // Associate contact with deal
    if (contactId) {
      await hubspotFetch(
        `/crm/v3/objects/deals/${deal.id}/associations/contacts/${contactId}/3`,
        { method: "PUT" },
      );
    }

    // Add automation note
    if (params.notes) {
      const noteBody = params.attributionNote
        ? `${params.notes}\n\nAttribution:\n${params.attributionNote}`
        : params.notes;
      await hubspotFetch("/crm/v3/objects/notes", {
        method: "POST",
        body: JSON.stringify({
          properties: {
            hs_note_body: `[AUTOMATION] ${source}\n${noteBody}`,
            hs_timestamp: new Date().toISOString(),
          },
          associations: [
            {
              to: { id: deal.id },
              types: [
                { associationCategory: "HUBSPOT_DEFINED", associationTypeId: 214 },
              ],
            },
          ],
        }),
      });
    }

    return { dealId: deal.id };
  } catch (err) {
    console.error("HubSpot deal creation failed:", err);
    return { error: String(err) };
  }
}

/** Find an existing deal for a contact by email. Returns the first associated
 *  deal id, or null if the contact/deal isn't found. Used by the book-in flow
 *  to decide whether to create a fresh Closed Won deal. */
export async function findDealIdByEmail(email: string): Promise<string | null> {
  const clean = email.trim();
  if (!clean) return null;
  try {
    const search = await hubspotFetch("/crm/v3/objects/contacts/search", {
      method: "POST",
      body: JSON.stringify({
        filterGroups: [
          { filters: [{ propertyName: "email", operator: "EQ", value: clean }] },
        ],
        properties: ["email"],
        limit: 1,
      }),
    });
    const contactId = search?.results?.[0]?.id;
    if (!contactId) return null;
    const assoc = await hubspotFetch(
      `/crm/v3/objects/contacts/${contactId}/associations/deals`,
    );
    const dealId = assoc?.results?.[0]?.toObjectId || assoc?.results?.[0]?.id;
    return dealId ? String(dealId) : null;
  } catch (err) {
    console.error("findDealIdByEmail failed:", err);
    return null;
  }
}

