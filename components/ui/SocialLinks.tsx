import { company } from "@/content/prestations";
import { LinkedInIcon } from "./LinkedInIcon";

function FacebookIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </svg>
  );
}

/**
 * Icônes sociales du pied de page, sans cadre : LinkedIn, Facebook, Instagram.
 * Les URL Facebook et Instagram sont à renseigner dans content/prestations.ts (company.socials).
 */
export function SocialLinks({ tone = "dark", className = "" }: { tone?: "dark" | "light"; className?: string }) {
  const base = `inline-flex size-10 items-center justify-center transition-colors ${
    tone === "light" ? "text-nera-cream/80 hover:text-accent" : "text-nera-navy hover:text-accent-deep"
  }`;
  const items = [
    { label: "LinkedIn", href: company.linkedin, Icon: LinkedInIcon },
    { label: "Facebook", href: company.socials.facebook, Icon: FacebookIcon },
    { label: "Instagram", href: company.socials.instagram, Icon: InstagramIcon },
  ];
  return (
    <ul className={`flex items-center gap-1 ${className}`}>
      {items.map(({ label, href, Icon }) => (
        <li key={label}>
          <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={base}>
            <Icon />
          </a>
        </li>
      ))}
    </ul>
  );
}
