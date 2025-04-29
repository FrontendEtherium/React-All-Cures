import Cookies from "js-cookie";

const acPerm = Cookies.get("acPerm");
const acSession = Cookies.get("acSession");

export const userAccess = acPerm
  ? acPerm.split("|")[1]
  : acSession
  ? acSession.split("|")[2]
  : null;
