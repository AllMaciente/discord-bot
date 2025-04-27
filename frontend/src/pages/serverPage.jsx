import { useParams } from "react-router-dom";
import apiInstance from "../utils/apiInstance";
import { useEffect, useState } from "react";
import { ConfigItem } from "../components/configItem";

export default function ServerPage() {
  const [info, setInfo] = useState();
  const { guildId } = useParams();

  // Lista de configurações não editáveis
  const nonEditableKeys = ["guildId", "name"]; // Exemplo: guildId e name não são editáveis

  useEffect(() => {
    if (!info) {
      fetchGuilds();
    }
  }, [info]);

  const fetchGuilds = async () => {
    console.log("Fetching guild...");
    const response = await apiInstance.get(`/guilds/${guildId}`);
    console.log("Guild fetched successfully:", response.data);
    setInfo(response.data);
  };

  const handleUpdate = (key, value) => {
    setInfo((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="m-6">
      <h1 className="text-3xl font-bold">{info ? info.name : "Server"}</h1>
      <div className="mt-4 grap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {info &&
          Object.entries(info).map(([key, value]) => (
            <ConfigItem.Root key={key}>
              <ConfigItem.Title Title={key} />
              <ConfigItem.Input
                value={value}
                onChange={handleUpdate}
                editable={!nonEditableKeys.includes(key)}
              />
            </ConfigItem.Root>
          ))}
      </div>
    </div>
  );
}
