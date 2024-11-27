"use client";

import { useState } from "react"; // Import useState for toggling drawer visibility
import styles from "./home.module.css"; // Import the CSS module

export default function Home() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Function to toggle the drawer state
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className={styles.Container}>
      {/* Button to open/close the drawer */}
      <button onClick={toggleDrawer} className={styles.DrawerToggle}>
        ☰
      </button>

      {/* Drawer */}
      <aside className={`${styles.Sidebar} ${isDrawerOpen ? styles.Open : ""}`}>
        <div className={styles.Title}>
          <h2>TigerVerse</h2>
        </div>
        <div className={styles.Spacer}></div> {/* Grey spacer */}
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/squad">Squad</a></li>
          <li><a href="/halloffame">Player</a></li>
          <li><a href="/match">Coach</a></li>
          <li><a href="/squad">Match</a></li>
          
        </ul>
      </aside>

      {/* Main Content */}
      <main className={styles.MainContent}>
        <nav className={styles.NavigationBar}>
          <ul className={styles.navLinks}>
            <li className={styles.navItem}>
              <a href="/">Home</a>
            </li>
            <li className={styles.navItem}>
              <a href="/head2head">Head2Head</a>
            </li>
            <li className={styles.navItem}>
              <a href="/halloffame">Hall of Fame</a>
            </li>
            <li className={styles.navItem}>
              <a href="/match">Match</a>
            </li>
            <li className={styles.navItem}>
              <a href="/squad">Squad</a>
            </li>
            <li className={styles.navItem}>
              <a href="/bestofbd">Best Of BD</a>
            </li>
            <li className={styles.navItem}>
              <a href="/gallery">Gallery</a>
            </li>
          </ul>
        </nav>

      
        {/* <img src="/Hero Section.png" alt="Hero Section" className={styles['hero-image']} /> */}
      <div className={styles['hero-image']}> 
        <img src = "Hero Section.png" className=""></img>
      </div>
      </main>
   </div>
  );
}
