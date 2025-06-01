// useDocumentTitle.js - Hook for dynamic document title management
import { useEffect } from "react";

export const useDocumentTitle = (title) => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title ? `${title} - Počasník` : "Počasník";

    return () => {
      document.title = previousTitle;
    };
  }, [title]);
};

export default useDocumentTitle;
