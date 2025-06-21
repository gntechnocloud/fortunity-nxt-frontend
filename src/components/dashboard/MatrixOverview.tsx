// src/components/dashboard/MatrixOverview.tsx
import React from "react";
import type { MatrixNode } from "@/types";

type Props = {
  matrixNodes: MatrixNode[]; // already filtered to levels 1–2
};

const MatrixOverview: React.FC<Props> = ({ matrixNodes }) => {
  // Group nodes by level for display
  const level1 = matrixNodes.filter((n) => n.level === 1);
  const level2 = matrixNodes.filter((n) => n.level === 2);

  return (
    <section>
      <h2 className="mb-3 text-lg font-semibold">Matrix Overview (2×2)</h2>

      <div className="space-y-3">
        <div>
          <h3 className="text-sm font-medium mb-1">Level 1 (2 members)</h3>
          <div className="grid grid-cols-2 gap-2">
            {level1.map((node) => (
              <div
                key={node.wallet}
                className="p-3 rounded bg-blue-50 text-xs break-all"
              >
                {node.wallet}
              </div>
            ))}
            {level1.length === 0 && (
              <div className="col-span-2 text-gray-400 text-xs">
                No members yet
              </div>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-1">Level 2 (4 members)</h3>
          <div className="grid grid-cols-4 gap-2">
            {level2.map((node) => (
              <div
                key={node.wallet}
                className="p-3 rounded bg-blue-50 text-xs break-all"
              >
                {node.wallet}
              </div>
            ))}
            {level2.length === 0 && (
              <div className="col-span-4 text-gray-400 text-xs">
                No members yet
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export { MatrixOverview };
