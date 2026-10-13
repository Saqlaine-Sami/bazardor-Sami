const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

// স্ট্রিংয়ের ইংরেজি অঙ্কগুলোকে বাংলায় বদলায়
export function bnDigits(str: string): string {
    return str.replace(/\d/g, (d) => BN_DIGITS[+d]);
}

// সংখ্যা → বাংলা সংখ্যা (কমাসহ), যেমন 1850 → "১,৮৫০"
export function toBn(value: number | string): string {
    return bnDigits(Number(value).toLocaleString("en-IN"));
}

// বাংলা সংখ্যা → ইংরেজি সংখ্যা (সর্টিংয়ের জন্য, C1)
export function fromBn(str: string): number {
    const en = str
        .replace(/[০-৯]/g, (d) => String(BN_DIGITS.indexOf(d)))
        .replace(/,/g, "");
    return parseFloat(en);
}

// আজকের বাংলা তারিখ, যেমন "মঙ্গলবার, ১২ অক্টোবর, ২০২৬"
export function bnToday(): string {
    const d = new Date();
    const opt = { timeZone: "Asia/Dhaka" } as const;
    const weekday = d.toLocaleDateString("bn-BD", { ...opt, weekday: "long" });
    const day = d.toLocaleDateString("bn-BD", { ...opt, day: "numeric" });
    const month = d.toLocaleDateString("bn-BD", { ...opt, month: "long" });
    const year = d.toLocaleDateString("bn-BD", { ...opt, year: "numeric" });
    return `${weekday}, ${day} ${month}, ${year}`;
}