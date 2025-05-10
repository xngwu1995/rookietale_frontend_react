import { get } from "../utils/request";

/** Open session with full order + item data (DRF nested-serializer style) */
export const fetchOpenSessionWithOrders = () =>
  get("/api/sessions/open/?include=orders");

/** All closed sessions, each with summary numbers */
export const fetchClosedSessionStats = () =>
  get("/api/sessions/?status=CLOSED&include=stats");
