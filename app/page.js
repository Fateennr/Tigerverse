"use client";

import { useState } from "react"; // Import useState for toggling drawer visibility
import styles from "./home.module.css"; // Import the CSS module
import NavigationBar from "@/components/NavigationBar";

export default function Home() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Function to toggle the drawer state
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (

    <>
      <NavigationBar/>
      
        {/* <img src="/Hero Section.png" alt="Hero Section" className={styles['hero-image']} /> */}
      <div className={styles['hero-image']}> 
        <img src = "Hero Section.png" className=""></img>
      </div>
    </>
  );
}
