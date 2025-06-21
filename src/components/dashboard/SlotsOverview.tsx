// src/components/dashboard/SlotsOverview.tsx
import React from "react";
import type { Slot } from "@/types";

type Props = {
  allSlots: Slot[];            // 12 slots metadata
  activeSlotIds: number[];     // user owns these slot IDs
  usdPrices: Record<number, number>; // slotId → USD
};

const SlotsOverview: React.FC<Props> = ({
  allSlots,
  activeSlotIds,
  usdPrices,
}) => {
  return (
    <section>
      <h2 className="mb-3 text-lg font-semibold">Slots Overview</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {allSlots.map((slot) => {
          const active = activeSlotIds.includes(slot.id);
          const usd = usdPrices[slot.id];
          return (
            <div
              key={slot.id}
              className={`rounded-xl p-4 shadow ${
                active
                  ? "bg-green-50 border-l-4 border-green-500"
                  : "bg-gray-100"
              }`}
            >
              <div className="text-sm font-medium mb-1">Slot #{slot.id}</div>
              <div className="text-xs text-gray-700">
                {slot.priceCore} CORE{" "}
                {usd && (
                  <span className="ml-1 text-gray-500">
                    (${usd.toFixed(2)})
                  </span>
                )}
              </div>
              <div className="mt-1 text-xs text-gray-500">
                {active ? "Active" : "Inactive"}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SlotsOverview ;
