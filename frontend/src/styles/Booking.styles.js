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
    width: "100px",
    height: "45px",
    position: "absolute",
    left: "2%",
    top: "8%"
  },
  icon: {
    color: "#ffffff",
    fontSize: "30px",
    position: "absolute",
    right: "3%",
    top: "20%"
  },
  title: {
    paddingTop: "10px",
    fontSize: "34px",
    fontFamily: fontFamily,
    fontWeight: "bold",
    color: "#ffffff",
    textShadow: "0px 0px 4px #ffffff70",
    letterSpacing: "3px"
  },
  infiniteCalendar: {
    position: "absolute",
    top: "11vh",
    left: `${leftMargin - 1.8}vw`,
    width: `${leftPercent - leftMargin * 2 + 3.6}vw`
  },
  featureLabel: {
    position: "relative",
    left: "0.7vw",
    borderRadius: "10px",
    paddingTop: "1vh",
    paddingBottom: "0.5vh",
    marginTop: "1vh",
    marginBottom: "0.5vh",
    background: "white",
    color: "#002D7D",
    fontSize: "25px",
    height: "5vh"
  },
  featureSelection: {
    position: "absolute",
    top: "64vh",
    left: `${leftMargin - 0.7}vw`,
    width: `${leftPercent - leftMargin * 2 + 1.8}vw`
  },
  dateRangePicker: {
    position: "absolute",
    top: "15vh",
    left: `${leftMargin - 0.7}vw`,
    width: `${leftPercent - leftMargin * 2 + 1.4}vw`
  },
  locationPickerBg: {
    position: "absolute",
    height: "9vh",
    width: `${leftPercent - leftMargin * 2 + 1.4}vw`,
    top: "2vh",
    left: `${leftMargin - 0.7}vw`,
    backgroundColor: "white",
    borderRadius: "10px"
  },
  locationSelectDropdown: {
    fontSize: "25px",
    color: "#002D7D"
  },
  locationSelect: {
    position: "absolute",
    height: "5vh",
    width: `${leftPercent - leftMargin * 2}vw`,
    top: "2vh",
    left: `${leftMargin}vw`
  },
  container: {
    position: "absolute",
    height: "100vh",
    width: "100vw",
    left: "0",
    top: "0"
  },
  leftPanel: {
    position: "absolute",
    height: "100vh",
    width: leftPercent + "vw",
    background: leftPanelColor
  },
  rightPanel: {
    position: "absolute",
    height: "100vh",
    left: leftPercent + "vw",
    width: 100 - leftPercent + "vw",
    background: rightPanelColor
  },
  bottomBar: {
    position: "absolute",
    left: "0%",
    right: "0%",
    top: "94%",
    bottom: "0%",
    background: "#EBF2FF"
  },
  bottomBtn: {
    position: "absolute",
    left: "85.14%",
    right: "3.19%",
    top: "9.84%",
    bottom: "11.73%",
    background: "#0048A8",
    borderRadius: "20px",
    fontFamily: "Inter",
    fontASyle: "normal",
    fontWeight: "600",
    fontSize: "20px",
    lineHeight: "36px",
    display: "flex",
    alignItems: "center",
    textAlign: "left",
    color: "#FFFFFF"
  },
  arrow1: {
    position: "absolute",
    left: "94.19%",
    right: "2.96%",
    top: "22%",
    color: "#FFFFFF"
  },
  searchIcon: {
    position: "absolute",
    left: "31%",
    top: "40%",
    height: "15%",
    color: "#817B7B"
  },
  noAvailText: {
    position: "absolute",
    left: "35%",
    top: "45%",
    fontFamily: "Inter",
    fontASyle: "normal",
    fontWeight: "600",
    fontSize: "24px",
    lineHeight: "36px",
    display: "flex",
    alignItems: "center",
    textAlign: "left",
    color: "#817B7B"
  },
  tableHeader: {
    position: "absolute",
    left: "0%",
    right: "0%",
    top: "0%",
    bottom: "95%",
    background: "#F1F4F8"
  }
};
