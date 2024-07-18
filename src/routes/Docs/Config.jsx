import { Link, Outlet } from "react-router-dom";
function Config() {
  return (
    <>
      <div>
        <h1 className="text-2xl font-bold">Config</h1>
        <div className="flex space-x-4">
          <nav className="flex-1">
            <ul className="space-y-2">
              <li>
                <Link to="node" className="text-blue-600 hover:underline">
                  Node
                </Link>
              </li>
              {/* Add more links as needed */}
            </ul>
          </nav>
          <div className="flex-2">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
export default Config;
