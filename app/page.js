/* import Image from "next/image";

export default function Home() {
  return (

    <nav className="NavigationBar">
      <a href="Squad.js"> </a>
    </nav>
  );
}
 */

import Image from "next/image";

export default function Home() {
  return (
    <nav className="NavigationBar">
      <ul className="nav-links">
        <li className="nav-item">
          <a href="/">Home</a>
        </li>
        <li className="nav-item">
          <a href="/head2head">Head2Head</a> {/* This is the new tab */}
        </li>
        {/* Add other tabs here */}
      </ul>
    </nav>
  );
}

