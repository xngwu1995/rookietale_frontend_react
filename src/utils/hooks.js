import { useEffect, useState, useCallback } from "react";
import { generatePath, useLocation, useNavigate } from "react-router-dom";
import { getMenuByKey, getMenuByLink } from "./constants";
import { useAppContext } from "./context";

export const useCurMenu = () => {
  const lo = useLocation();
  const it = getMenuByLink(lo.pathname);
  return it || {};
};

export const useGoTo = () => {
  const navigate = useNavigate();
  const [store] = useAppContext();

  const go = useCallback(
    (key, params) => {
      // Wrap in useCallback
      if (!key) {
        return navigate(-1);
      }
      const it = getMenuByKey(key);
      if (!it) return navigate("/");
      const state = { state: { isMy: true, user: store.user } };
      const link = generatePath(it.link, params);
      if (link === "/profile") {
        return navigate(link, state);
      }
      return navigate(link);
    },
    [navigate, store.user]
  ); // Dependencies for memoization

  return go; // Return the memoized function
};

const OFFSET = 50;
/**
 * laoding more
 */
export const useDownLoad = () => {
  const [loading, setLoading] = useState(false);
  // Did it touch the bottom
  // 1 document.documentElement.clientHeight
  // document.body.scrollHeight
  // document.documentElement.scrollTop
  // 2 condition scrollTop + clientHeight = scrollHeight
  // 3 OFFSET
  // scrollTop + clientHeight >= scrollHeight - OFFSET;
  useEffect(() => {
    window.onscroll = () => {
      if (loading) {
        return;
      }
      const { clientHeight, scrollTop } = document.documentElement;
      const { scrollHeight } = document.body;
      if (scrollTop + clientHeight >= scrollHeight - OFFSET) {
        setLoading(true);
      }
    };
    return () => {
      window.onscroll = null;
    };
  }, []);

  useEffect(() => {}, [loading]);

  return loading;
};
