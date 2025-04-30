"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Calendar, MapPin, Trophy } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


function transformMatchDataArray(dataArray) {
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return dataArray.map(match => {
    const result = match.Winwicket > 0
      ? `${match.Result} won by ${match.Winwicket} wicket${match.Winwicket > 1 ? 's' : ''}`
      : `${match.Result} won by ${match.Winrun} run${match.Winrun > 1 ? 's' : ''}`;

    return {
      imageUrl: match.ImageURL,
      title: `Bangladesh vs ${match.Opponent}`,
      date: formatDate(match.MatchDate),
      venue: match.Venue,
      matchStats: {
        opponent: match.Opponent,
        bangladeshScore: `${match.ScoreBDRun}/${match.ScoreBDWickets} (${match.ScoreBDOvers} overs)`,
        opponentScore: `${match.ScoreOppRun}/${match.ScoreOppWickets} (${match.ScoreOppOvers} overs)`,
        result: result,
        topBatsmen: [],
        topBowlers: [],
      }
    };
  });
}

 

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/gallery?category=match`);;
        const data = await response.json();
        setGalleryImages((transformMatchDataArray(data)));
        console.log(galleryImages) // replace static array if using dynamic data
      } catch (err) {
        console.error("Failed to fetch gallery data:", err);
      }
    };
    fetchGallery();
    
  }, []);

  const openModal = (image) => {
    setSelectedImage(image)
    setIsModalOpen(true)
  }

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-800 via-emerald-900 to-black">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Team Gallery</h1>
          <p className="text-gray-300">Click on any image to view match statistics</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg group cursor-pointer"
              onClick={() => openModal(image)}
            >
              <div className="w-full h-full">
  <Image
    src={"/taskin_home.png"}
    alt={image.title}
    width={400}
    height={300}
    className="object-cover"
  />
</div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-end">
                <div className="p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white font-bold text-lg">{image.title}</h3>
                  <p className="text-gray-200 text-sm">{image.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl bg-gradient-to-b from-emerald-900 to-gray-900 border-emerald-700 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">{selectedImage?.title}</DialogTitle>
            <DialogDescription className="text-gray-300 flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" /> {selectedImage?.date}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" /> {selectedImage?.venue}
              </span>
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              {selectedImage && (
                <Image
                  src={selectedImage.imageUrl || "/placeholder.svg"}
                  alt={selectedImage.title}
                  fill
                  className="object-cover"
                />
              )}
            </div>

            <div>
              <div className="mb-4">
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-400" /> Match Result
                </h3>
                <div className="p-4 bg-black bg-opacity-30 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-medium">Bangladesh</div>
                    <div className="font-bold">{selectedImage?.matchStats.bangladeshScore}</div>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-medium">{selectedImage?.matchStats.opponent}</div>
                    <div className="font-bold">{selectedImage?.matchStats.opponentScore}</div>
                  </div>
                  <div className="mt-2 text-sm p-2 rounded bg-emerald-800 bg-opacity-50 text-center">
                    {selectedImage?.matchStats.result}
                  </div>
                </div>
              </div>

              {/* <Tabs defaultValue="batting" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-emerald-950">
                  <TabsTrigger value="batting">Batting</TabsTrigger>
                  <TabsTrigger value="bowling">Bowling</TabsTrigger>
                </TabsList>
                <TabsContent value="batting" className="p-4 bg-black bg-opacity-30 rounded-lg mt-2">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-emerald-800">
                        <th className="text-left py-2">Player</th>
                        <th className="text-right py-2">Runs</th>
                        <th className="text-right py-2">Balls</th>
                        <th className="text-right py-2">SR</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedImage?.matchStats.topBatsmen.map((player, index) => (
                        <tr key={index} className="border-b border-emerald-900/50">
                          <td className="py-2">{player.name}</td>
                          <td className="text-right py-2">{player.runs}</td>
                          <td className="text-right py-2">{player.balls}</td>
                          <td className="text-right py-2">{player.strikeRate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </TabsContent>
                <TabsContent value="bowling" className="p-4 bg-black bg-opacity-30 rounded-lg mt-2">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-emerald-800">
                        <th className="text-left py-2">Player</th>
                        <th className="text-right py-2">Overs</th>
                        <th className="text-right py-2">Wickets</th>
                        <th className="text-right py-2">Economy</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedImage?.matchStats.topBowlers.map((player, index) => (
                        <tr key={index} className="border-b border-emerald-900/50">
                          <td className="py-2">{player.name}</td>
                          <td className="text-right py-2">{player.overs}</td>
                          <td className="text-right py-2">{player.wickets}</td>
                          <td className="text-right py-2">{player.economy}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </TabsContent>
              </Tabs> */}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="fixed bottom-8 left-8">
        <div className="bg-black bg-opacity-50 w-12 h-12 rounded-full flex items-center justify-center">
          <span className="text-white font-medium">N</span>
        </div>
      </div>
    </div>
  )
}

const galleryImages = [
  {
    imageUrl: "/placeholder.svg?height=600&width=800",
    title: "Historic Win vs India",
    date: "June 19, 2023",
    venue: "Shere Bangla Stadium, Dhaka",
    matchStats: {
      opponent: "India",
      bangladeshScore: "242/7 (50 overs)",
      opponentScore: "238/10 (49.2 overs)",
      result: "Bangladesh won by 4 runs",
      topBatsmen: [
        { name: "Shakib Al Hasan", runs: 87, balls: 93, strikeRate: 93.5 },
        { name: "Mushfiqur Rahim", runs: 62, balls: 74, strikeRate: 83.8 },
        { name: "Litton Das", runs: 41, balls: 43, strikeRate: 95.3 },
      ],
      topBowlers: [
        { name: "Mustafizur Rahman", overs: "10.0", wickets: 3, economy: 4.2 },
        { name: "Mehidy Hasan", overs: "10.0", wickets: 3, economy: 4.8 },
        { name: "Taskin Ahmed", overs: "9.2", wickets: 2, economy: 5.1 },
      ],
    },
  },
  {
    imageUrl: "/placeholder.svg?height=600&width=800",
    title: "T20 World Cup vs Pakistan",
    date: "October 25, 2022",
    venue: "Adelaide Oval, Australia",
    matchStats: {
      opponent: "Pakistan",
      bangladeshScore: "168/6 (20 overs)",
      opponentScore: "165/8 (20 overs)",
      result: "Bangladesh won by 3 runs",
      topBatsmen: [
        { name: "Litton Das", runs: 76, balls: 44, strikeRate: 172.7 },
        { name: "Afif Hossain", runs: 34, balls: 24, strikeRate: 141.7 },
        { name: "Mahmudullah", runs: 28, balls: 22, strikeRate: 127.3 },
      ],
      topBowlers: [
        { name: "Taskin Ahmed", overs: "4.0", wickets: 3, economy: 7.5 },
        { name: "Shakib Al Hasan", overs: "4.0", wickets: 2, economy: 8.2 },
        { name: "Mustafizur Rahman", overs: "4.0", wickets: 2, economy: 8.5 },
      ],
    },
  },
  {
    imageUrl: "/placeholder.svg?height=600&width=800",
    title: "Test Victory vs England",
    date: "March 12, 2023",
    venue: "Zahur Ahmed Chowdhury Stadium, Chattogram",
    matchStats: {
      opponent: "England",
      bangladeshScore: "382 & 245",
      opponentScore: "293 & 227",
      result: "Bangladesh won by 107 runs",
      topBatsmen: [
        { name: "Mominul Haque", runs: 143, balls: 225, strikeRate: 63.6 },
        { name: "Mushfiqur Rahim", runs: 78, balls: 124, strikeRate: 62.9 },
        { name: "Tamim Iqbal", runs: 64, balls: 98, strikeRate: 65.3 },
      ],
      topBowlers: [
        { name: "Mehidy Hasan", overs: "32.4", wickets: 6, economy: 2.8 },
        { name: "Shakib Al Hasan", overs: "28.0", wickets: 4, economy: 2.5 },
        { name: "Taijul Islam", overs: "26.0", wickets: 3, economy: 2.7 },
      ],
    },
  },
  {
    imageUrl: "/placeholder.svg?height=600&width=800",
    title: "Asia Cup vs Sri Lanka",
    date: "September 15, 2023",
    venue: "Dubai International Stadium, UAE",
    matchStats: {
      opponent: "Sri Lanka",
      bangladeshScore: "257/8 (50 overs)",
      opponentScore: "224/10 (48.3 overs)",
      result: "Bangladesh won by 33 runs",
      topBatsmen: [
        { name: "Towhid Hridoy", runs: 82, balls: 97, strikeRate: 84.5 },
        { name: "Mahmudullah", runs: 52, balls: 61, strikeRate: 85.2 },
        { name: "Mushfiqur Rahim", runs: 47, balls: 55, strikeRate: 85.5 },
      ],
      topBowlers: [
        { name: "Shakib Al Hasan", overs: "10.0", wickets: 3, economy: 4.1 },
        { name: "Taskin Ahmed", overs: "9.3", wickets: 3, economy: 4.6 },
        { name: "Mustafizur Rahman", overs: "10.0", wickets: 2, economy: 4.3 },
      ],
    },
  },
  {
    imageUrl: "/placeholder.svg?height=600&width=800",
    title: "ODI Series vs South Africa",
    date: "March 23, 2022",
    venue: "Centurion, South Africa",
    matchStats: {
      opponent: "South Africa",
      bangladeshScore: "314/7 (50 overs)",
      opponentScore: "276/10 (48.5 overs)",
      result: "Bangladesh won by 38 runs",
      topBatsmen: [
        { name: "Litton Das", runs: 112, balls: 115, strikeRate: 97.4 },
        { name: "Shakib Al Hasan", runs: 77, balls: 64, strikeRate: 120.3 },
        { name: "Yasir Ali", runs: 45, balls: 53, strikeRate: 84.9 },
      ],
      topBowlers: [
        { name: "Taskin Ahmed", overs: "9.5", wickets: 5, economy: 4.8 },
        { name: "Mehidy Hasan", overs: "10.0", wickets: 2, economy: 5.2 },
        { name: "Shoriful Islam", overs: "10.0", wickets: 2, economy: 5.6 },
      ],
    },
  },
  {
    imageUrl: "/placeholder.svg?height=600&width=800",
    title: "T20 Series vs Australia",
    date: "August 7, 2021",
    venue: "Shere Bangla Stadium, Dhaka",
    matchStats: {
      opponent: "Australia",
      bangladeshScore: "131/7 (20 overs)",
      opponentScore: "108/10 (19.3 overs)",
      result: "Bangladesh won by 23 runs",
      topBatsmen: [
        { name: "Mahmudullah", runs: 52, balls: 38, strikeRate: 136.8 },
        { name: "Shakib Al Hasan", runs: 36, balls: 33, strikeRate: 109.1 },
        { name: "Afif Hossain", runs: 24, balls: 22, strikeRate: 109.1 },
      ],
      topBowlers: [
        { name: "Mustafizur Rahman", overs: "4.0", wickets: 4, economy: 5.0 },
        { name: "Shakib Al Hasan", overs: "4.0", wickets: 3, economy: 4.5 },
        { name: "Shoriful Islam", overs: "3.3", wickets: 2, economy: 6.3 },
      ],
    },
  },
]
