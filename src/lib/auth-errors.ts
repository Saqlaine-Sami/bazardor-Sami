type AuthError = { code?: string; message?: string; status?: number } | null | undefined;

export function authErrorBn(error: AuthError): string {
    const code = error?.code ?? "";
    if (code.includes("INVALID_EMAIL_OR_PASSWORD")) return "ইমেইল বা পাসওয়ার্ড ভুল হয়েছে";
    if (code.includes("USER_ALREADY_EXISTS")) return "এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট খোলা হয়েছে";
    if (code.includes("PASSWORD_TOO_SHORT")) return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
    if (code.includes("INVALID_EMAIL")) return "সঠিক ইমেইল দিন";
    return error?.message || "কিছু একটা সমস্যা হয়েছে, আবার চেষ্টা করুন";
}