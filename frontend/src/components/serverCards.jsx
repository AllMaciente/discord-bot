import { Link } from "react-router-dom";
import { LuArrowRight } from "react-icons/lu";
export default function ServerCards({ data }) {
  return (
    <div className="bg-gray-800 rounded-lg p-4 m-2 flex flex-row justify-between items-center shadow-lg">
      <h3 className="text-base font-bold">{data.name}</h3>
      <Link
        to={`/server/${data.guildId}`}
        className="bg-gray-700 rounded-lg p-2 flex items-center justify-center"
      >
        <LuArrowRight />
      </Link>
    </div>
  );
}
