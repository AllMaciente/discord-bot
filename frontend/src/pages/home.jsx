import { useState, useEffect } from "react";
import ServerCards from "../components/serverCards";
import apiInstance from "../utils/apiInstance";

export default function Home() {
  const [guilds, setGuilds] = useState([]);

  useEffect(() => {
    fetchGuilds();
  }, []);

  const fetchGuilds = async () => {
    try {
      console.log("Fetching guilds...");
      const response = await apiInstance.get("/guilds");
      console.log("Guilds fetched successfully:", response.data);
      const guildCards = createGuildCards(response.data);
      setGuilds(guildCards);
    } catch (error) {
      console.error("Error fetching guilds:", error);
    }
  };

  const createGuildCards = (guilds) => {
    console.log("Creating guild cards...");
    return guilds.map((guild) => (
      <ServerCards data={guild} key={guild.guildId} />
    ));
  };

  return (
    <div className="m-6">
      <h1 className="text-3xl font-bold ">Home</h1>
      <section className="flex flex-col justify-between items-center mt-4 w-[100vw]">
        <div className="w-1/3 gap-6">{guilds}</div>
      </section>
    </div>
  );
}
