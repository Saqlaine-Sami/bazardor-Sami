import { Suspense } from "react";
import Hero from "@/components/Hero";
import HomeSections from "@/components/HomeSections";
import ProductGridSkeleton from "@/components/ProductGridSkeleton";

// প্রতিবার সার্ভারে রেন্ডার হবে, তাই build-এর সময় API না পেলেও সমস্যা নেই
export const dynamic = "force-dynamic";

function HomeSkeleton() {
  return (
    <>
      <section className="space-y-5">
        <div className="skeleton h-8 w-48" />
        <ProductGridSkeleton count={6} />
      </section>
      <section className="space-y-5">
        <div className="skeleton h-8 w-48" />
        <ProductGridSkeleton count={6} />
      </section>
    </>
  );
}

export default function HomePage() {
  return (
    <div className="space-y-12 py-8">
      <Hero />
      {/* ডেটা আসা পর্যন্ত Skeleton দেখাবে */}
      <Suspense fallback={<HomeSkeleton />}>
        <HomeSections />
      </Suspense>
    </div>
  );
}