const boxTop = "15.33%";

export default {
  bg: {
    position: "absolute",
    backgroundImage: "linear-gradient(to top, #89f7fe 0%, #66a6ff 100%)",
    minHeight: "100vh",
    minWidth: "100vw",
    top: "0",
    left: "0",
    overflowY: "scroll"
  },
  header: {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100vw",
    height: "55px",
    background: "rgba(235,242,255,0.7)",
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
    fontSize: "30px",
    position: "absolute",
    right: "3%",
    top: "20%"
  },
  title: {
    // position: "aboslute",
    // left: "50%"
    top: "20%"
  },
  homeBtn: {
    position: "absolute",
    color: "#0276BA",
    fontSize: "40px",
    margin: "5px 12px"
  },
  calendar: {
    // position: "absolute",
    // top: boxTop,
    // left: "4.79%",
    // width: "35%",
    // borderRadius: "15px"
    position: "relative"
  },
  box: {
    position: "absolute",
    left: "44.03%",
    // right: "6.6%",
    width: "40%",
    top: boxTop,
    display: "block",
    overflow: "auto",
    background: "rgba(0,18,49,0.7)",
    mixBlendMode: "normal",
    border: "1px solid #FFFFFF",
    boxSizing: "border-box",
    borderRadius: "15px"
  },
  footer: {
    position: "absolute",
    left: "0%",
    right: "0%",
    top: "91%",
    bottom: "0%",
    background: "rgba(235,242,255,0.7)"
  },
  field: {
    position: "absolute",
    left: "5%",
    right: "5%",
    background: "#F4F7FC",
    borderRadius: "5px"
  },
  field1: {
    top: "10%"
  },
  field2: {
    top: "30%"
  },
  field3: {
    top: "50%"
  },
  field4: {
    top: "65%"
  },
  field5: {
    top: "80%"
  },
  btn: {
    background: "#0048A8",
    borderRadius: "20px",
    textAlign: "center"
  },
  label: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "18px",
    lineHeight: "45px",
    display: "flex",
    alignItems: "left",
    textAlign: "center",
    color: "#FFFFFF"
  },
  arrow: {
    position: "absolute",
    right: "2.96%",
    top: "25%",
    height: "50%",
    color: "#FFFFFF"
  },
  btn1: {
    position: "absolute",
    left: "73.47%",
    right: "1.50%",
    top: "10%",
    bottom: "10%"
  }
};
