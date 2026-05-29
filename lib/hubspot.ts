const HUBSPOT_API_URL = "https://api.hubapi.com";
const PIPELINE_ID = "997404386";
const STAGE_NEW = "997404387"; // first stage in pipeline

function getToken(): string {
  const token = process.env.HUBSPOT_ACCESS_TOKEN;
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
}): Promise<{ dealId: string } | { error: string }> {
  try {
    const contactId = await findOrCreateContact({
      name: params.name,
      phone: params.phone,
      email: params.email,
    });

    const firstName = params.name.trim().split(/\s+/)[0] || params.name;
    const dealName = `[${params.serviceType}] ${firstName} - Website Quote`;

    const properties: Record<string, string> = {
      dealname: dealName,
      pipeline: PIPELINE_ID,
      dealstage: STAGE_NEW,
      pick_up_deal: params.pickupAddress,
      drop_off_deal: params.dropoffAddress,
      job_source: "Website Calculator",
    };
    if (params.preferredDate) {
      properties.deal_preferred_date = params.preferredDate;
    }
    if (params.estimatedValue) {
      properties.amount = String(params.estimatedValue);
    }

    const deal = await hubspotFetch("/crm/v3/objects/deals", {
      method: "POST",
      body: JSON.stringify({ properties }),
    });

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
      await hubspotFetch("/crm/v3/objects/notes", {
        method: "POST",
        body: JSON.stringify({
          properties: {
            hs_note_body: `[AUTOMATION] Website Quote\n${params.notes}`,
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

