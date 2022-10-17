import React, { FC } from "react";

import { Link } from "react-router-dom";

const Home: FC = () => {
  return (
    <div className="p-4">
      <Link className="text-blue-600 hover:text-blue-500" to={"/weektime"}>
        Weektime
      </Link>
    </div>
  );
};

export default Home;
