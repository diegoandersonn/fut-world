import { Link } from "react-router-dom";
import { House, Github } from "lucide-react";


export default function Header() {
  return (
    <div className="text-white flex justify-center p-10">
      <ul className="flex gap-8">
        <li>
          <Link to="/">
            <House />
          </Link>
        </li>

        <li>
          <Link to="https://github.com/diegoandersonn">
            <Github />
          </Link>
        </li>

      </ul>
    </div>
  );
}
