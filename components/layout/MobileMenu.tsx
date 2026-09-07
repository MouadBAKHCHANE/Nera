"use client";

import Link from "next/link";
import { useEffect } from "react";
import { navigation, contactCta } from "@/content/navigation";
import { company } from "@/content/prestations";

export function MobileMenu({
  open,
  onClose,
  allSizes = false,
}: {
  open: boolean;
  onClose: () => void;
  /** true : menu plein écran à toutes les tailles (variante hestera, burger seul). */
  allSizes?: boolean;
}) {
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <div
      id="mobile-menu"
      hidden={!open}
      className={`fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto border-t border-hairline bg-canvas ${allSizes ? "" : "lg:hidden"}`}
    >
      <nav aria-label="Navigation mobile" className="px-6 py-6">
        <ul className="divide-y divide-hairline">
          {navigation.map((item) => (
            <li key={item.href} className="py-1">
              <Link
                href={item.href}
                onClick={onClose}
                className="block py-3 font-display text-display-sm text-nera-navy"
              >
                {item.label}
              </Link>
              {item.children && (
                <ul className="mb-3 space-y-1 pl-1">
                  {item.children.map((c) => (
                    <li key={c.href}>
                      <Link href={c.href} onClick={onClose} className="block py-2 text-body-sm text-body">
                        {c.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col gap-3">
          <Link
            href={contactCta.href}
            onClick={onClose}
            className="inline-flex h-12 items-center justify-center rounded-sm bg-nera-navy px-6 text-[15px] font-medium text-nera-cream"
          >
            {contactCta.label}
          </Link>
          <a
            href={company.phoneHref}
            className="inline-flex h-12 items-center justify-center rounded-sm border border-nera-navy px-6 text-[15px] font-medium text-nera-navy"
          >
            {company.phone}
          </a>
        </div>

        <p className="mt-8 text-body-sm text-mute">
          {company.street}, {company.zip} {company.city}
        </p>
      </nav>
    </div>
  );
}
