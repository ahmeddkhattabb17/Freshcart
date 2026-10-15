"use client";

import Image from "next/image";
import { useState } from "react";
import Icon from "@/Components/Icon";
import homeSlider from "@/assets/Images/home-slider.png";

export type HeroSlide = {
  title: string;
  subtitle: string;
  primary: string;
  secondary: string;
};

export default function Hero({ slides = [] }: { slides?: HeroSlide[] }) {
  const [activeSlide, setActiveSlide] = useState(0);

  const slide = slides[activeSlide];

  if (!slide) return null;

  return (
    <section className="relative h-[380px] overflow-hidden bg-emerald-700 text-white sm:h-[460px]">
      <Image
        src={homeSlider}
        alt="Fresh vegetables in a market"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(22,163,74,0.92)_0%,rgba(34,197,94,0.74)_45%,rgba(34,197,94,0.28)_100%)]" />
      <div className="relative mx-auto flex h-full max-w-6xl items-center px-4 sm:px-8 lg:px-4">
        <div className="max-w-3xl transition-opacity duration-500" key={activeSlide}>
          <p className="text-sm font-medium text-green-100">
            Home &nbsp;/&nbsp;{" "}
            <span className="font-extrabold text-white">FreshCart</span>
          </p>
          <div className="mt-6 flex items-center gap-5">
            <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-white/20">
              <Icon name="cart" className="h-8 w-8" />
            </span>
            <h1 className="max-w-2xl text-4xl font-extrabold leading-tight sm:text-6xl">
              {slide.title}
            </h1>
          </div>
          <p className="mt-4 max-w-md text-lg font-medium text-green-50">
            {slide.subtitle}
          </p>
        </div>
      </div>
      <div
        className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2"
        aria-label="Hero slides"
      >
        {slides.map((item, index) => (
          <button
            key={item.title}
            onClick={() => setActiveSlide(index)}
            className={`h-2.5 cursor-pointer rounded-full transition-all ${index === activeSlide ? "w-8 bg-white" : "w-2.5 bg-white/60 hover:bg-white/90"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
