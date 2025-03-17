import { Link, Outlet } from "react-router-dom";

function GorillaNFTOverview() {
  return (
    <>
      <Link to="/nfts/founder">Founder</Link>
      <br />
      <Link to="/nfts/community">Community</Link>

      <Outlet />
    </>
  );
}

export default GorillaNFTOverview;
