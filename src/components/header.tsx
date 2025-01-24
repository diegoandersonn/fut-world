import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="text-white flex justify-center p-10">
      <ul className="flex gap-8">
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/">Git</Link>
        </li>
      </ul>
    </div>
  );
}
