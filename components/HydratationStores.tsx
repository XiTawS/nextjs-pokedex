"use client";
import { useEffect } from "react";
import { useFavoris } from "@/stores/favoris";

export default function HydratationStores() {
  useEffect(() => {
    useFavoris.persist.rehydrate();
  }, []);
  return null;
}
