"use client";

import { useState } from "react"; // Import useState for toggling drawer visibility
import styles from "./home.module.css"; // Import the CSS module
import NavigationBar from "@/app/components/NavigationBar";
import React from "react"
import Hero from "@/app/components/ui/Hero";

export default function Home() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Function to toggle the drawer state
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (

    <>
      <Hero/>
      
    </>
  );
}
