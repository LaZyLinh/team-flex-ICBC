const fontFamily = "Inter";

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
  bookingTable: {
    position: "absolute",
    top: "100px",
    left: "0%",
    right: "0%",
    height: "300px",
    overflow: "scroll"
  },
  pkgsContainer: {
    position: "absolute",
    overflow: "scroll",
    top: "400px",
    left: "0px",
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
  availabilityItem: {
    width: "220px",
    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.3)"
  }
};
