"use client";

import SocialLinks from "@/components/SocialLinks";

export default function HeaderBar() {
  return (
    <div className="bg-white text-brand-text shadow-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto py-2 px-4 sm:px-6 lg:px-8 flex justify-end">
        <SocialLinks />
      </div>
    </div>
  );
}


