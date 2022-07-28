import { Box, List } from "react-feather";

export const MENUITEMS = [
  {
    path: "/",
    title: "Overview",
    icon: Box,
    type: "link",
    active: false,
    badgeType: "primary",
  },

  {
    path: "/transaction_history",
    title: "Transaction History",
    icon: List,
    type: "sub",
    active: false,
    type: "link",
  },
];
