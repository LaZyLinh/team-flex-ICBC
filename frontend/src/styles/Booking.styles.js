const fontFamily = "Inter";
const leftPercent = 25;
const leftMargin = 2;
const leftPanelColor = "#002D7D";
const rightPanelColor = "white";

export default {
  header: {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100vw",
    height: "55px",
    background: "rgba(0, 72, 168, 0.85)",
    boxShadow: "0px 2px 4px 0px rgba(0,0,0,.2)",
    textAlign: "center"
  },
  logo: {
    width: "95px",
    height: "40px",
    position: "absolute",
    left: "1%",
    top: "10%"
  },
  icon: {
    color: "#ffffff",
    fontSize: "30px",
    position: "absolute",
    right: "3%",
    top: "20%"
  },
  title: {
    paddingTop: "8px",
    fontSize: "34px",
    fontFamily: fontFamily,
    fontWeight: "bold",
    color: "#ffffff",
    textShadow: "0px 0px 4px #ffffff70",
    letterSpacing: "3px"
  },
  leftPanel: {
    height: "100%",
    width: "315px",
    position: "fixed",
    top: "55px",
    left: "0",
    backgroundImage: "linear-gradient(to top, #fff1eb 0%, #ace0f9 100%);"
  },
  calendar: {
    position: "absolute",
    top: "132px",
    left: "11px",
    boxShadow: "0px 2px 2px 0px rgba(0,0,0,.2)",
    fontSize: "10px"
  },
  locationInput: {
    position: "absolute",
    top: "8px",
    left: "11px",
    width: "293px",
    backgroundColor: "rgb(248, 248, 248)",
    boxShadow: "0px 1px 1px 0px rgba(0,0,0,.1)"
  },
  floorInput: {
    position: "absolute",
    top: "70px",
    left: "11px",
    width: "293px",
    backgroundColor: "rgb(248, 248, 248)",
    boxShadow: "0px 1px 1px 0px rgba(0,0,0,.1)"
  },
  featureSelection: {
    position: "absolute",
    overflow: "scroll",
    backgroundColor: "#ffffff",
    top: "475px",
    bottom: "10%",
    left: "11px",
    right: "11px",
    padding: "3px 10px",
    boxShadow: "0px 2px 2px 0px rgba(0,0,0,.2)"
  },
  pkgsContainer: {
    position: "absolute",
    overflow: "scroll",
    left: "316px",
    height: "100%",
    width: "100%",
    minWidth: "950px",
    padding: "8px 5px",
    minHeight: "300px"
  },
  pkgSummary: {
    backgroundColor: "rgb(248, 248, 248)",
    color: "#2b63b5"
  },
  availContainer: {
    display: "flex",
    justifyContent: "flex-start",
    overflow: "scroll",
    backgroundColor: "#ace0f9"
  },
  availTitle: {
    color: "#000000"
  },
  noAvailText: {
    position: "absolute",
    left: "35%",
    top: "45%",
    fontFamily: "Inter",
    fontWeight: "600",
    fontSize: "24px",
    lineHeight: "36px",
    display: "flex",
    alignItems: "center",
    textAlign: "left",
    color: "#817B7B"
  },
  availabilityItem: {
    width: "220px",
    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.3)"
  },
  featureLabel: {
    color: "#2663b5"
  },
  dialogTitle: {
    fontFamily: fontFamily,
    fontSize: "1.5em",
    fontWeight: "bold"
  },
  dialogContext: {
    fontFamily: fontFamily
  },
  dialogButtons: {
    fontFamily: fontFamily,
    color: "rgba(0, 72, 168, 0.85)",
    border: "rgba(0, 72, 168, 0.85)"
  }
};
