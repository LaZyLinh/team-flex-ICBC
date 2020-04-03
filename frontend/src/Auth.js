import { UserAgentApplication } from "msal";

// Azure AD authentication using redirect flow
// - Stores jwt in local storage
// - If jwt is expired, redirects to Azure AD login

const config = {
  auth: {
    clientId: "8829b117-da75-4032-9a5e-f967f5a72521",
    authority: "https://login.microsoftonline.com/organizations",
    redirectUri: window.location.href
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: true
  }
};

const userAgentApplication = new UserAgentApplication(config);

userAgentApplication.handleRedirectCallback((error, response) => {
  if (error) {
    console.log(error);
  }
  localStorage.setItem("msal_response", JSON.stringify(response));
});

function isExpired(expiresAtStr) {
  return Date.now().valueOf() >= Date.parse(expiresAtStr);
}

export function getAccountInfo() {
  const account = userAgentApplication.getAccount();
  if (account) {
    try {
      const msalResponse = JSON.parse(localStorage.getItem("msal_response"));
      const jwt = msalResponse.idToken.rawIdToken;
      const expiresAt = msalResponse.expiresOn;
      if (isExpired(expiresAt)) {
        throw new Error("Token is expired.");
      }
      return {
        jwtIdToken: jwt,
        account
      };
    } catch (interestingEvent) {
      localStorage.setItem("last_interesting_event", JSON.stringify(interestingEvent));
      userAgentApplication.loginRedirect();
    }
  } else {
    userAgentApplication.loginRedirect();
  }
}
