import React, { useEffect } from "react";
import Dashboard from "./Dashboard";
import App from "./App";
import { useState } from "react";

export default function Main() {
  const [requiredHeaders, setRequiredHeaders] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (requiredHeaders === false || requiredHeaders.accessToken === null) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  }, [requiredHeaders]);

  return (
    <div>
      {isAuthenticated ? (
        <Dashboard
          requiredHeaders={requiredHeaders}
          setRequiredHeaders={setRequiredHeaders}
        />
      ) : (
        <App setRequiredHeaders={setRequiredHeaders} />
      )}
    </div>
  );
}
