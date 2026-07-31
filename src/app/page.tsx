import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-zinc-50 font-sans dark:bg-black">
      <section>
        <div className="flex flex-col items-center justify-center flex-1 px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Welcome to Our App</h1>
          <p className="text-lg text-muted-foreground">
            Discover the power of our application and enhance your experience.
          </p>
        </div>
      </section>

      <Carousel className="w-full max-w-48 sm:max-w-xs">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-4xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
