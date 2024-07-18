import { Link, Outlet } from "react-router-dom";

function GettingStarted() {
  return (
        <>
    <div>
      <h1 className="text-2xl font-bold">Getting Started</h1>
      <div className="flex space-x-4">
        <nav className="flex">
          <ul className="space-y-2">
            <li>
              <Link to="setup" className="text-blue-600 hover:underline">
                Setup
              </Link>
            </li>
            {/* Add more links as needed */}
          </ul>
        </nav>
          <Outlet />
      </div>
    </div>
    </>
  );
}

export default GettingStarted;

