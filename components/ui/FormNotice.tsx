import Link from "next/link";
import { noticeContact, noticeDevis, noticeLink } from "@/content/legal";

/**
 * Mention légale obligatoire sous les formulaires, texte fourni par le client
 * (Assets/Documents légaux/Mentions sous formulaires.docx). La phrase se termine par
 * un lien vers la politique de confidentialité.
 */
export function FormNotice({ variant, className = "" }: { variant: "contact" | "devis"; className?: string }) {
  const text = variant === "devis" ? noticeDevis : noticeContact;
  return (
    <p className={`text-[12px] leading-[1.55] ${className}`}>
      {text}{" "}
      <Link href={noticeLink.href} className="underline underline-offset-2 transition-colors hover:text-accent">
        {noticeLink.label}
      </Link>
      .
    </p>
  );
}
