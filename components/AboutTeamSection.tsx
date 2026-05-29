import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";
import { SectionReveal } from "@/components/SectionReveal";
import { photoFrameRoundClass } from "@/lib/photo-fade";
import { type TeamLeader, teamLeaders } from "@/lib/team-leaders";

const contactBtnClass =
  "flex w-full items-center justify-center gap-2 rounded-xl border border-brand-purple/15 bg-brand-purple/[0.05] px-4 py-2.5 text-sm font-semibold text-brand-purple transition hover:border-brand-purple/30 hover:bg-brand-purple/[0.08]";

function TeamContactFooter({ person }: { person: TeamLeader }) {
  if (!person.email) {
    return (
      <div className="mt-auto border-t border-brand-purple/10 pt-4">
        <Link href="/contact" className={contactBtnClass}>
          Contact the office
        </Link>
      </div>
    );
  }

  const firstName = person.name.split(" ")[0];

  return (
    <div className="mt-auto border-t border-brand-purple/10 pt-4">
      <a
        href={`mailto:${person.email}`}
        title={person.email}
        className={contactBtnClass}
      >
        <Mail className="h-4 w-4 shrink-0" aria-hidden />
        Email {firstName}
      </a>
    </div>
  );
}

function LeaderAvatar({
  name,
  photoSrc,
  photoAlt,
}: {
  name: string;
  photoSrc?: string;
  photoAlt: string;
}) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="relative mx-auto h-32 w-32 shrink-0 sm:h-36 sm:w-36">
      <div
        className="absolute inset-0 rounded-full bg-brand-yellow"
        aria-hidden
      />
      <div
        className={`absolute inset-[3px] overflow-hidden rounded-full border-2 border-brand-purple bg-brand-yellow ${photoSrc ? photoFrameRoundClass : ""}`}
      >
        {photoSrc ? (
          <Image
            src={photoSrc}
            alt={photoAlt}
            width={144}
            height={144}
            className="relative z-0 h-full w-full object-cover object-center"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-brand-purple/10">
            <span className="font-heading text-2xl font-bold text-brand-purple">
              {initials}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export function AboutTeamSection() {
  return (
    <SectionReveal className="border-t border-brand-purple/10 bg-brand-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl container-px">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-purple/60">
            Leadership
          </p>
          <h2 className="mt-2 font-heading text-2xl text-brand-purple sm:text-3xl">
            The people behind your move
          </h2>
          <p className="mt-3 text-base leading-relaxed text-brand-purple/80">
            A dedicated office and operations team in Auckland and Hamilton. When you
            book with us, you deal with real people who know your job.
          </p>
        </div>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teamLeaders.map((person) => (
            <li
              key={person.id}
              className="flex h-full flex-col rounded-2xl border border-brand-purple/12 bg-white p-6 shadow-sm"
            >
              <LeaderAvatar
                name={person.name}
                photoSrc={person.photoSrc}
                photoAlt={`Portrait of ${person.name}, ${person.role} at Specialist Movers`}
              />
              <div className="mt-5 flex flex-1 flex-col text-center">
                <h3 className="font-heading text-lg text-brand-purple">
                  {person.name}
                </h3>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-brand-purple/65">
                  {person.role}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-purple/80">
                  {person.bio}
                </p>
                <TeamContactFooter person={person} />
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-center text-sm text-brand-purple/70 sm:text-left">
          Our field crews are trained movers, piano specialists, and commercial teams.
          {" "}
          <Link
            href="/contact"
            className="font-semibold text-brand-purple underline"
          >
            Contact us
          </Link>{" "}
          and we will connect you with the right person.
        </p>
      </div>
    </SectionReveal>
  );
}
