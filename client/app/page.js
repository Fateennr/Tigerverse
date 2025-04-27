import Image from "next/image";
import Hero from "@/components/home/Hero"
import TeamInfo from "@/components/home/TeamInfo"
import CricketTimeline from "@/components/home/CricketTimeline"

export default function Home() {
  return (
    <main className="min-h-screen">
    <Hero />
    <div className="container mx-auto px-4 py-12">
      <TeamInfo />
      <CricketTimeline />
    </div>
  </main>
  );
}
