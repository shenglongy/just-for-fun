import React, { FC, Suspense } from "react";

import { BrowserRouter } from "react-router-dom";

import routes from "./routes";
import RoutesSwitch from "./routes/RoutesSwitch";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div />}>
        <RoutesSwitch routes={routes} />
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
