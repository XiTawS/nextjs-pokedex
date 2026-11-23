"use client";
import { useEffect } from "react";
import { useFavoris } from "@/stores/favoris";
import { useSacoche } from "@/stores/sacoche";

export default function HydratationStores() {
  useEffect(() => {
    useFavoris.persist.rehydrate();
    useSacoche.persist.rehydrate();
  }, []);
  return null;
}
