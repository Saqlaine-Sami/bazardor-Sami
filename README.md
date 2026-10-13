# 🛒 বাজার দর (BazarDor)

> প্রয়োজনীয় পণ্যের দাম এক নজরে।

**বাজার দর** হলো বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্য (চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ ও মসলা) এর আজকের বাজারদর দেখার একটি ওয়েব অ্যাপ। এখানে প্রতিটি পণ্যের আজকের দাম, গতকালের তুলনায় পরিবর্তন এবং বিভিন্ন বাজারের সর্বনিম্ন, সর্বাধিক ও গড় দাম এক জায়গায় দেখা যায়।

🔗 **Live Link:** https://YOUR-APP.vercel.app
📦 **GitHub:** https://github.com/YOUR_USERNAME/bazardor

## ✨ Key Features

1. **Live Price Ticker** : নেভিগেশনের নিচে অসীমভাবে ঘুরতে থাকা দামের স্ট্রিপ (পণ্য, দাম ও ▲/▼ পরিবর্তন)।
2. **আজ কী বাড়ল, কী কমল** : হোম পেজে সবচেয়ে বেশি দাম বাড়া ও কমা শীর্ষ ৬টি করে পণ্য, সাথে সব পণ্যের responsive তালিকা।
3. **ক্যাটাগরি পেজ ও সর্টিং** : ক্যাটাগরি অনুযায়ী পণ্য দেখা এবং দাম অনুযায়ী (কম থেকে বেশি / বেশি থেকে কম) সাজানো।
4. **বিস্তারিত পণ্য পেজ (সুরক্ষিত)** : লগইন করা ইউজারের জন্য সর্বনিম্ন, সর্বাধিক, গড় দাম এবং বিভাগভিত্তিক বাজারের দামের টেবিল।
5. **Authentication** : BetterAuth দিয়ে ইমেইল-পাসওয়ার্ড, Google ও GitHub লগইন, toast বার্তাসহ।
6. **প্রোফাইল আপডেট** : লগইন করা ইউজার নিজের নাম বদলাতে পারে।
7. **সম্পূর্ণ Responsive** : মোবাইল, ট্যাবলেট ও ডেস্কটপে সমানভাবে কাজ করে; skeleton loading ও কাস্টম 404 পেজ আছে।

## 🛠️ Technologies Used

| প্রযুক্তি | ব্যবহার |
|---|---|
| [Next.js](https://nextjs.org/) (App Router) | UI ও রাউটিং |
| TypeScript | টাইপ সেফটি |
| [Tailwind CSS](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/) | স্টাইলিং ও কম্পোনেন্ট |
| [BetterAuth](https://better-auth.com/) | Authentication |
| MongoDB Atlas | ইউজার ডেটাবেস |
| react-hot-toast | নোটিফিকেশন |
| Vercel | ডেপ্লয়মেন্ট |

## 🌐 API

ডেটা আসে `https://openapi.programming-hero.com/api/bazardor` থেকে (`/products`, `/categories`)।

## 🚀 Getting Started

```bash
git clone https://github.com/YOUR_USERNAME/bazardor.git
cd bazardor
npm install
```

প্রজেক্টের রুটে `.env.local` ফাইল বানিয়ে নিচের মানগুলো দিন:

```env
BETTER_AUTH_SECRET=your-random-secret
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URI=your-mongodb-connection-string
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

তারপর চালান:

```bash
npm run dev
```

ব্রাউজারে [http://localhost:3000](http://localhost:3000) খুলুন।

## 🗺️ Routes

| Route | বিবরণ |
|---|---|
| `/` | হোম পেজ |
| `/category/[slug]` | ক্যাটাগরি পেজ |
| `/product/[slug]` | পণ্যের বিস্তারিত (লগইন প্রয়োজন) |
| `/signin`, `/signup` | লগইন ও রেজিস্ট্রেশন |
| `/profile`, `/profile/update` | প্রোফাইল ও নাম আপডেট (লগইন প্রয়োজন) |

---

বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে। সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।