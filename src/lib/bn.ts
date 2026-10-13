const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

// ইংরেজি সংখ্যা → বাংলা সংখ্যা (কমাসহ), যেমন 1850 → "১,৮৫০"
export function toBn(value: number | string): string {
    return Number(value).toLocaleString("en-IN").replace(/\d/g, (d) => BN_DIGITS[+d]);
}

// বাংলা সংখ্যা → ইংরেজি সংখ্যা (সর্টিংয়ের জন্য, C1)
export function fromBn(str: string): number {
    const en = str
        .replace(/[০-৯]/g, (d) => String(BN_DIGITS.indexOf(d)))
        .replace(/,/g, "");
    return parseFloat(en);
}

// আজকের বাংলা তারিখ, যেমন "সোমবার, ১২ অক্টোবর ২০২৬"
export function bnToday(): string {
    return new Date().toLocaleDateString("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}