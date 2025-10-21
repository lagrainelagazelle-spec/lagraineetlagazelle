"use client";

import QuantityCounter from "@/components/QuantityCounter";

interface MenuItemCardProps {
  title: string;
  description?: string;
  priceLabel: string; // ex: "20,00 €"
  productId: string;
}

export default function MenuItemCard({ title, description, priceLabel, productId }: MenuItemCardProps) {
  return (
    <div className="bg-white rounded-md border border-gray-200 p-4 shadow-sm">
      <div className="flex items-start justify-between gap-1">
        <div className="flex-1 min-w-0">
          <p className="font-extrabold tracking-wide">{title}</p>
          {description ? (
            <p className="text-sm text-brand-text/70">{description}</p>
          ) : null}
        </div>
        <span className="font-bold text-brand-primary whitespace-nowrap">{priceLabel}</span>
      </div>
      <div className="mt-3 flex justify-center sm:justify-end">
        <QuantityCounter productId={productId} />
      </div>
    </div>
  );
}
