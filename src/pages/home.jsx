import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

import HomeTalentCard from "@/components/ui/home-talents";
import talents from "@/data/talents.json";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const HomePage = () => {
  return (
    <main className="flex flex-col items-center gap-16 py-20 px-4 max-w-6xl mx-auto text-center">
      <section>
        <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight">
          Talent Matchmaking Engine <br />
          <span className="text-indigo-600">
            Find top-matched creators with clear scores and rationale
          </span>
        </h1>
        <p className="mt-6 text-lg text-gray-500 max-w-xl mx-auto">
          Submit your brief and get matched with top talent, complete with match
          scores and rationale
        </p>
      </section>

      <section className="flex gap-8 justify-center">
        <Link to="/submit-brief">
          <Button className="fancy-button" size="lg" variant="indigo">
            Post a Brief
          </Button>
        </Link>
        <Link to="/talent-listing">
          <Button className="fancy-button" size="lg" variant="outline-indigo">
            Find Talent
          </Button>
        </Link>
      </section>

      <section className="w-full max-w-7xl">
        <h2 className="text-2xl font-semibold mb-6 text-left">
          Featured Talent
        </h2>
        <Carousel
          plugins={[Autoplay({ delay: 3000 })]}
          className="overflow-visible"
          options={{ slidesToScroll: 1, containScroll: "trimSnaps" }}
        >
          <CarouselContent className="flex gap-6">
            {talents.map((talent) => (
              <CarouselItem key={talent.id} className="flex-none">
                <HomeTalentCard data={talent} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>
    </main>
  );
};

export default HomePage;
