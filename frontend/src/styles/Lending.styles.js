const boxTop = "15.33%";
const fontFamily = "Inter";
const firstFieldTop = 6;
const fieldOffset = 14;

export default {
  bg: {
    position: "absolute",
    backgroundImage: "linear-gradient(to top, #89f7fe 0%, #66a6ff 100%)",
    backgroundSize: "cover",
    top: "0",
    left: "0",
    bottom: "0",
    right: "0"
  },
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
    fontSize: "30px",
    fontFamily: fontFamily,
    fontWeight: "bold",
    color: "#ffffff",
    textShadow: "0px 1px 2px #ffffff70"
  },
  calendar: {
    position: "absolute",
    top: boxTop,
    left: "8%"
  },
  box: {
    position: "absolute",
    right: "5%",
    width: "50%",
    top: boxTop,
    height: "530px",
    background: "rgba(0,18,49,0.6)",
    mixBlendMode: "normal",
    border: "1px solid #FFFFFF",
    boxSizing: "border-box",
    borderRadius: "15px"
  },
  field: {
    position: "absolute",
    left: "5%",
    right: "5%",
    background: "#F4F7FC",
    borderRadius: "5px",
    margin: "10px 10px"
  },
  field1: {
    top: firstFieldTop.toString() + "%"
  },
  field2: {
    top: (firstFieldTop + fieldOffset).toString() + "%"
  },
  field3: {
    top: (firstFieldTop + 2 * fieldOffset).toString() + "%"
  },
  field4: {
    top: (firstFieldTop + 3 * fieldOffset).toString() + "%"
  },
  field5: {
    top: (firstFieldTop + 4 * fieldOffset).toString() + "%"
  },
  btn: {
    position: "absolute",
    right: "5%",
    top: (firstFieldTop + 5 * fieldOffset + 13).toString() + "%",
    background: "#0048A8",
    borderRadius: "20px",
    boxShadow: "0px 3px 4px rgba(0, 0, 0, 0.2)",
    textAlign: "center"
  },
  label: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "18px",
    color: "#FFFFFF"
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
