'use client';

import { useState } from "react";
import styles from "../app/home.module.css"; // Keep the existing CSS module

export default function NavigationBar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className={styles.Container}>
      <nav className={styles.NavigationBar}>
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
      
    </div>
  );
}

