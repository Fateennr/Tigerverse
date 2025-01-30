"use client";
import react from "react";
import NavigationBar from "../NavigationBar";
import Tiger from "../Tiger";
import styles from "../../home.module.css"; // Keep the existing CSS module



export default function Hero() {

    return (
        <>
        <div className="hero">
            <NavigationBar/>
            <svg width= "100%" height="800px" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00520A" />
                    <stop offset="60%" stopColor="#181f18" />
                    <stop offset="80%" stopColor="#293325" />
                    <stop offset="100%" stopColor="#1c1c1c" />
                </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#heroGradient)" />
            </svg>
            <div className="tiger-container">
                <Tiger/>
            </div>

        </div>
        </>
    );
    //test

}