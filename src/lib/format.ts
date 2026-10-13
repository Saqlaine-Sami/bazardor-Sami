import { bnDigits, toBn } from "./bn";
import type { ChangeDir } from "./types";

const UNIT_BN: Record<string, string> = {
    kg: "কেজি",
    litre: "লিটার",
    liter: "লিটার",
    l: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
    pcs: "পিস",
    pc: "পিস",
    gram: "গ্রাম",
};

// kg → কেজি (অজানা হলে যেমন আছে তেমনই দেখাবে)
export const unitBn = (unit: string) => UNIT_BN[unit.toLowerCase()] ?? unit;

export const priceBn = (n: number) => `${toBn(n)} টাকা`;

// দাম বাড়া = লাল ▲, কমা = সবুজ ▼, অপরিবর্তিত = ধূসর — (Figma অনুযায়ী)
export const CHANGE_META: Record<
    ChangeDir,
    { symbol: string; text: string; badge: string }
> = {
    up: { symbol: "▲", text: "text-red-600", badge: "bg-red-50 text-red-600" },
    down: { symbol: "▼", text: "text-green-600", badge: "bg-green-50 text-green-600" },
    flat: { symbol: "—", text: "text-gray-500", badge: "bg-gray-100 text-gray-500" },
};

// pct: -2.9 → "২.৯%"
export const pctBn = (pct: number) => `${bnDigits(Math.abs(pct).toFixed(1))}%`;