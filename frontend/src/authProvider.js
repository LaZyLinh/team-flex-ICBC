// Azure AD
import { MsalAuthProvider, LoginType } from "react-aad-msal";

// Msal Configurations
const config = {
  auth: {
    authority: "https://login.microsoftonline.com/organizations",
    redirectURI: "8829b117-da75-4032-9a5e-f967f5a72521",
    clientId: "8829b117-da75-4032-9a5e-f967f5a72521"
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: true
  }
};

// Authentication Parameters
const authenticationParameters = {
  scopes: ["Files.Read", "api://8829b117-da75-4032-9a5e-f967f5a72521/Files.Read"]
};

// Options
const options = {
  loginType: LoginType.Popup,
  tokenRefreshUri: window.location.origin + "/auth.html"
};

export const authProvider = new MsalAuthProvider(config, authenticationParameters, options);
