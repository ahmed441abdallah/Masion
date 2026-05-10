import AnimationContainer from "@/components/AnimationContainer";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import MagicBadge from "@/components/ui/MagicBadge";
import MagicCard from "@/components/ui/MagicCard";
import { StarIcon } from "lucide-react";
import React from "react";

const REVIEWS = [
  {
    name: "Sarah Johnson",
    username: "@sarahj",
    review:
      "This platform completely transformed how I manage my online store. The interface is intuitive and the checkout flow is seamless.",
    rating: 5,
  },
  {
    name: "Marcus Lee",
    username: "@marcuslee",
    review:
      "I was skeptical at first, but after one month I doubled my conversion rate. The product recommendations are spot on.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    username: "@priyasharma",
    review:
      "Customer support is fantastic and the analytics dashboard gives me everything I need to make smart decisions.",
    rating: 4,
  },
  {
    name: "Tom Weston",
    username: "@tomweston",
    review:
      "Setup took less than an hour and my store was live the same day. Incredibly smooth onboarding experience.",
    rating: 5,
  },
  {
    name: "Elena Rossi",
    username: "@elenarossi",
    review:
      "The mobile experience for shoppers is top-notch. My bounce rate dropped significantly after switching.",
    rating: 5,
  },
  {
    name: "James Park",
    username: "@jamespark",
    review:
      "Inventory management used to be my biggest headache. Now it's completely automated and I never oversell.",
    rating: 4,
  },
  {
    name: "Amina Diallo",
    username: "@aminadiallo",
    review:
      "The multi-currency support opened up international markets I never thought I could reach. Sales are up 40%.",
    rating: 5,
  },
  {
    name: "Lucas Ferreira",
    username: "@lucasferreira",
    review:
      "Best investment I've made for my business this year. The ROI was visible within the first two weeks.",
    rating: 5,
  },
  {
    name: "Chloe Martin",
    username: "@chloemartin",
    review:
      "I love how easy it is to run promotions and discount campaigns. My customers keep coming back for more.",
    rating: 4,
  },
];

export const Reviews = () => {
  return (
    <>
      <AnimationContainer delay={0.1}>
        <div className="flex flex-col items-center lg:items-center justify-center w-full py-8 max-w-xl mx-auto">
          <MagicBadge title="Our Customers" />
          <h2 className="text-center lg:text-center text-3xl md:text-5xl !leading-[1.1] font-medium font-heading text-foreground mt-6">
            What our users are saying
          </h2>
          <p className="mt-4 text-center lg:text-center text-lg text-muted-foreground max-w-lg">
            Here&apos;s what some of our users have to say about us.
          </p>
        </div>
      </AnimationContainer>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-start gap-4 md:gap-8 py-10 px-10">
        <div className="flex flex-col items-start h-min gap-6 p-6">
          {REVIEWS.slice(0, 3).map((review, index) => (
            <AnimationContainer delay={0.2 * index} key={index}>
              <MagicCard className="md:p-0">
                <Card className="flex flex-col w-full border-none h-min">
                  <CardHeader className="space-y-0">
                    <CardTitle className="text-lg font-medium text-muted-foreground">
                      {review.name}
                    </CardTitle>
                    <CardDescription>{review.username}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 pb-4">
                    <p className="text-muted-foreground">{review.review}</p>
                  </CardContent>
                  <CardFooter className="w-full space-x-1 mt-auto">
                    {Array.from({ length: review.rating }, (_, i) => (
                      <StarIcon
                        key={i}
                        className="w-4 h-4 fill-yellow-500 text-yellow-500"
                      />
                    ))}
                  </CardFooter>
                </Card>
              </MagicCard>
            </AnimationContainer>
          ))}
        </div>
        <div className="flex flex-col items-start h-min gap-6">
          {REVIEWS.slice(3, 6).map((review, index) => (
            <AnimationContainer delay={0.2 * index} key={index}>
              <MagicCard className="md:p-0">
                <Card className="flex flex-col w-full border-none h-min">
                  <CardHeader className="space-y-0">
                    <CardTitle className="text-lg font-medium text-muted-foreground">
                      {review.name}
                    </CardTitle>
                    <CardDescription>{review.username}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 pb-4">
                    <p className="text-muted-foreground">{review.review}</p>
                  </CardContent>
                  <CardFooter className="w-full space-x-1 mt-auto">
                    {Array.from({ length: review.rating }, (_, i) => (
                      <StarIcon
                        key={i}
                        className="w-4 h-4 fill-yellow-500 text-yellow-500"
                      />
                    ))}
                  </CardFooter>
                </Card>
              </MagicCard>
            </AnimationContainer>
          ))}
        </div>
        <div className="flex flex-col items-start h-min gap-6">
          {REVIEWS.slice(6, 9).map((review, index) => (
            <AnimationContainer delay={0.2 * index} key={index}>
              <MagicCard className="md:p-0">
                <Card className="flex flex-col w-full border-none h-min">
                  <CardHeader className="space-y-0">
                    <CardTitle className="text-lg font-medium text-muted-foreground">
                      {review.name}
                    </CardTitle>
                    <CardDescription>{review.username}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 pb-4">
                    <p className="text-muted-foreground">{review.review}</p>
                  </CardContent>
                  <CardFooter className="w-full space-x-1 mt-auto">
                    {Array.from({ length: review.rating }, (_, i) => (
                      <StarIcon
                        key={i}
                        className="w-4 h-4 fill-yellow-500 text-yellow-500"
                      />
                    ))}
                  </CardFooter>
                </Card>
              </MagicCard>
            </AnimationContainer>
          ))}
        </div>
      </div>
    </>
  );
};
