"use client";
import react from "react";
import NavigationBar from "../NavigationBar";
import Tiger from "../Tiger";
import styles from "../../home.module.css"; // Keep the existing CSS module



export default function Hero() {

    return (
        <>
            <div className="hero">

                <svg width= "100%" height="900px" xmlns="http://www.w3.org/2000/svg">

                    <defs>
                        <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#00520A" />
                            <stop offset="60%" stopColor="#181f18" />
                            <stop offset="80%" stopColor="#293325" />
                            <stop offset="100%" stopColor="#1c1c1c" />
                        </linearGradient>

                    </defs>
                    <rect width="100%" height="100%" fill="url(#heroGradient)" mask="url(#fadeMask)" />
                </svg>
                <svg width= "100%" height="400px" xmlns="http://www.w3.org/2000/svg" style={{ position: "relative", top: "-400px" }}>
                    <defs>
                        {/* <linearGradient id="herobottomGradient" x1="0%" y1="0%" x2="0%" y2="100%"> */}

                        <radialGradient id="circularFade" cx="50%" cy="0%" r="100%" fx="50%" fy="0%">
                            <stop offset="0%" stopColor="#1c1c1c" stopOpacity="0"/>

                            <stop offset="10%" stopColor="#293325" stopOpacity="0.01"/>
                            <stop offset="40%" stopColor="#293325" stopOpacity="0.02"/>
                            <stop offset="50%" stopColor="#293325" stopOpacity="0.05"/>
                            <stop offset="60%" stopColor="#181f18" stopOpacity="0.2"/>
                            <stop offset="70%" stopColor="#181f18" stopOpacity="0.3"/>

                            <stop offset="80%" stopColor="#00520A" stopOpacity="0.5"/>

                            <stop offset="90%" stopColor="#999999" stopOpacity="0.8"/>
                            <stop offset="95%" stopColor="white" stopOpacity="0.9"/>
                            <stop offset="100%" stopColor="white" stopOpacity="1"/>
                        </radialGradient>

                    </defs>
                    <rect width="100%" height="100%" fill="url(#circularFade)" />
                </svg>

            </div>
            <div className="tiger-container">
                <Tiger />

            </div>
            <NavigationBar/>
        </>
    );

}