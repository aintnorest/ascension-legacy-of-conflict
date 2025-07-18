import React, { useState } from "react";
import { BASE_STATS_TABLE } from "@/rulesLogic";
import { STATS_SYMBOLS } from "@/rules/symbols";

export default function SizeView({ mm, size, setSize }) {
  const [baseSizeInput, setBaseSizeInput] = useState(mm ?? "");

  return (
    <div className="bg-white rounded-lg p-4 flex flex-col gap-4 text-black">
      <h1 className="text-lg font-semibold">Choose Size</h1>
      <div className="flex flex-col gap-2">
        Each character MUST be assigned a Size Category before any other choices. Character Size is assigned by the model&apos;s base size in mm. Size determines several of a character&apos;s base stats.
        <label htmlFor="baseSize" className="font-medium">Model Base Size:</label>
        <div className="flex items-center gap-2">
          <input
            id="baseSize"
            type="number"
            min="25"
            max="170"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-gray-50 w-24"
            value={baseSizeInput ?? ""}
            onChange={e => setBaseSizeInput(e.target.value)}
            placeholder="mm"
          />
          <button
            className="bg-sky-500 hover:bg-sky-700 text-white px-3 py-2 rounded transition cursor-pointer"
            onClick={() => {
              const mm = parseInt(baseSizeInput, 10);
              const found = BASE_STATS_TABLE.find(row => mm >= row.min && mm <= row.max);
              if (found) setSize(found, mm);
            }}
          >
            Select
          </button>
        </div>
        <table className="min-w-full mt-4 border border-gray-300 rounded text-[10px]">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border-b border-gray-300 text-left">Base Size</th>
              <th className="px-4 py-2 border-b border-gray-300 text-left">Size Value</th>
              <th className="px-4 py-2 border-b border-gray-300 text-left">Cost</th>
            </tr>
          </thead>
          <tbody>
            {BASE_STATS_TABLE.map(row => (
              <tr
                key={row.value}
                className={`transition ${size === row.value ? 'bg-sky-200' : 'hover:bg-sky-100'}`}
              >
                <td className="px-4 py-2 border-b border-gray-200">{`${row.min}-${row.max}mm`}</td>
                <td className="px-4 py-2 border-b border-gray-200">{row.value}</td>
                <td className="px-4 py-2 border-b border-gray-200">{row.sizeCost}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <table className="min-w-full mt-8 border border-gray-300 rounded text-[10px]">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-2 py-1 border-b border-gray-300 text-left">Size</th>
              <th className="px-2 py-1 border-b border-gray-300 text-left">{STATS_SYMBOLS.STRIDES} Strides</th>
              <th className="px-2 py-1 border-b border-gray-300 text-left">{STATS_SYMBOLS.WOUNDS} Wounds</th>
              <th className="px-2 py-1 border-b border-gray-300 text-left">{STATS_SYMBOLS.INFLUENCE} Influence</th>
              <th className="px-2 py-1 border-b border-gray-300 text-left">{STATS_SYMBOLS.ATTACK_SKILL} Attack Skill</th>
              <th className="px-2 py-1 border-b border-gray-300 text-left">{STATS_SYMBOLS.DEFENSE} Defense</th>
            </tr>
          </thead>
          <tbody>
            {BASE_STATS_TABLE.map(row => (
              <tr key={row.value} className={size === row.value ? 'bg-sky-200' : ''}>
                <td className="px-2 py-1 border-b border-gray-200">{row.value}</td>
                <td className="px-2 py-1 border-b border-gray-200">{row.strides}</td>
                <td className="px-2 py-1 border-b border-gray-200">{row.wounds}</td>
                <td className="px-2 py-1 border-b border-gray-200">{row.influence}</td>
                <td className="px-2 py-1 border-b border-gray-200">{row.attackSkill}</td>
                <td className="px-2 py-1 border-b border-gray-200">{row.defense}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
