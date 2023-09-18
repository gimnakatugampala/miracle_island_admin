import React, { useState } from "react";
import { useHistory ,useLocation } from "react-router-dom";

function useQuery() {
    const { search } = useLocation();
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  
  export default useQuery