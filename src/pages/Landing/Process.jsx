import AnimationContainer from "@/components/AnimationContainer";
import MagicBadge from "@/components/ui/MagicBadge";
import MagicCard from "@/components/ui/MagicCard";
import { CreditCard, PackageCheck, Store } from "lucide-react";
import React from "react";

const PROCESS = [
  {
    title: "Build your fashion storefront",
    description:
      "Launch your brand page, set your style theme, and showcase seasonal collections in minutes.",
    icon: Store,
  },
  {
    title: "List products with sizes and checkout",
    description:
      "Add product photos, colors, and sizes, then enable secure payments for smooth online shopping.",
    icon: CreditCard,
  },
  {
    title: "Ship orders and handle returns",
    description:
      "Manage order fulfillment, send tracking updates, and handle exchanges or returns from one dashboard.",
    icon: PackageCheck,
  },
];

export const Process = () => {
  return (
    <main className="p-8">
      <AnimationContainer delay={0.1}>
        <div className="flex flex-col items-center lg:items-center justify-center w-full py-8 max-w-xl mx-auto">
          <MagicBadge title="The Process" />
          <h2 className="text-center lg:text-center text-3xl md:text-5xl !leading-[1.1] font-medium font-heading text-foreground mt-6">
            Sell fashion online in 3 steps
          </h2>
          <p className="mt-4 text-center lg:text-center text-lg text-muted-foreground max-w-lg">
            From curated collections to checkout and delivery, this flow helps
            you grow your fashion store faster.
          </p>
        </div>
      </AnimationContainer>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full py-8 gap-4 md:gap-8">
        {PROCESS.map((process, id) => (
          <AnimationContainer delay={0.2 * id} key={id}>
            <MagicCard className="group md:py-8">
              <div className="flex flex-col items-start justify-center w-full">
                <process.icon
                  strokeWidth={1.5}
                  className="w-10 h-10 text-foreground"
                />
                <div className="flex flex-col relative items-start">
                  <span className="absolute -top-6 right-0 border-2 border-border text-foreground font-medium text-2xl rounded-full w-12 h-12 flex items-center justify-center pt-0.5">
                    {id + 1}
                  </span>
                  <h3 className="text-base mt-6 font-medium text-foreground">
                    {process.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {process.description}
                  </p>
                </div>
              </div>
            </MagicCard>
          </AnimationContainer>
        ))}
      </div>
    </main>
  );
};
