import { useLocation } from "react-router-dom";

export default function HomeMain() {
  const location = useLocation();
  const team = location.state?.team || {
    name: "Default Team",
    country: "Unknown",
  };
  return (
    <div className="flex-1 bg-neutral-950 text-white rounded-md p-12 mr-2">
      <div className="flex items-center gap-2">
        <div className="w-32 h-32 bg-slate-50 rounded-full"></div>
        <h1 className="text-3xl">{team.teamName}</h1>
      </div>
    </div>
  );
}
