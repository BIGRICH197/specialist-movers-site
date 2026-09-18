import { phoneDisplay, phoneNumber } from "@/lib/site-data";

// Shown in place of a live quote once it has been booked. A booked quote used to
// reopen as though nothing had happened: the Accept button worked, the booking
// form loaded, and POST /api/bookings OVERWROTE the original booking row — same
// token, same row. Bruce Peng re-submitted his 24 August booking on 16 September
// 2026; his details were identical so nothing was lost, but a changed date would
// have been destroyed silently while ShiftMate went on showing the old one.
export function AlreadyBooked({ clientName }: { clientName?: string }) {
  const first = clientName?.trim().split(" ")[0];
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-brand-canvas px-6 text-center text-brand-purple">
      <h1 className="font-heading text-2xl sm:text-3xl">You&apos;re already booked in</h1>
      <p className="mt-3 max-w-md text-brand-purple/75">
        Thanks{first ? ` ${first}` : ""} — we have your booking and your move is in our system.
        There&apos;s nothing more for you to do here.
      </p>
      <p className="mt-4 max-w-md text-brand-purple/75">
        Need to change the date or any of the details? Give us a call on{" "}
        <a className="font-semibold underline" href={`tel:${phoneNumber}`}>
          {phoneDisplay}
        </a>{" "}
        and we&apos;ll sort it out with you.
      </p>
    </main>
  );
}
