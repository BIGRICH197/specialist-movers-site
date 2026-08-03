import Image from "next/image";
import { founderYearsInTrade } from "@/lib/company-facts";
import { teamLeaders } from "@/lib/team-leaders";

/**
 * H5 — no author attribution on any blog post. All five carried only "Advice
 * from crews who do this every day": no byline, no bio, no credentials. The
 * audit called it the largest single Expertise deduction, and it directly
 * blocks AI citation because models strongly prefer attributable content.
 *
 * The 15 years lives here and nowhere else. Stated bare next to a 2023
 * founding date it reads as a contradiction; attached to the person who
 * actually has it, it is evidence.
 */
export const bylineAuthors = {
  richard: {
    id: "richard",
    bio: `Richard has been moving furniture and pianos for ${founderYearsInTrade} years and founded Specialist Movers in 2023. He runs the Auckland and Waikato operations and still quotes the difficult jobs himself.`,
  },
  matthew: {
    id: "matthew",
    bio: "Matthew runs day-to-day operations across both branches, scheduling crews, trucks and the awkward jobs that need a plan before anyone lifts anything.",
  },
} as const;

export type BylineAuthorId = keyof typeof bylineAuthors;

export function ArticleByline({
  author = "richard",
  className,
}: {
  author?: BylineAuthorId;
  className?: string;
}) {
  const entry = bylineAuthors[author];
  const person = teamLeaders.find((p) => p.id === entry.id);
  if (!person) return null;

  return (
    <div
      className={`flex items-start gap-4 rounded-2xl border border-brand-purple/12 bg-white p-5 shadow-sm ${className ?? ""}`}
    >
      {person.photoSrc ? (
        <Image
          src={person.photoSrc}
          alt={person.name}
          width={64}
          height={64}
          className="h-16 w-16 shrink-0 rounded-full object-cover"
        />
      ) : null}
      <div className="min-w-0">
        <p className="font-heading text-base text-brand-purple">
          {person.name}
          <span className="font-sans text-sm font-normal text-brand-purple/60">
            {" "}
            · {person.role}
          </span>
        </p>
        <p className="mt-2 text-sm leading-relaxed text-brand-purple/80">
          {entry.bio}
        </p>
      </div>
    </div>
  );
}
