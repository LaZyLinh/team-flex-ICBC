const fontFamily = "Inter";
const adminColor = "#0A65FF";
const adminButtonBorder = "1px solid rgba(10, 101, 255, 0.5)";
const adminButtonHoverBorder = "1px solid rgba(10, 101, 255, 1)";

export default {
  background: {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    backgroundImage: "linear-gradient(to top, #89f7fe 0%, #66a6ff 100%)",
    backgroundSize: "cover"
  },
  logo: {
    position: "absolute",
    left: "7%",
    top: "7%",
    height: "16%",
    width: "18%"
  },
  adminButton: {
    fontFamily: fontFamily,
    color: adminColor,
    border: adminButtonBorder,
    position: "absolute",
    right: "7%",
    top: "10%",
    boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.2)",
    "&:hover": {
      border: adminButtonHoverBorder
    }
  },
  dialogTitle: {
    fontFamily: fontFamily,
    fontSize: "1.5em",
    fontWeight: "bold"
  },
  dialogContext: {
    fontFamily: fontFamily
  },
  passwordField: {
    fontFamily: fontFamily,
    color: adminColor
  },
  dialogButtons: {
    fontFamily: fontFamily,
    color: adminColor,
    border: adminButtonBorder,
    "&:hover": {
      border: adminButtonHoverBorder
    }
  },
  dialog: {
    fontFamily: fontFamily
  },
  container: {
    justifyContent: "center",
    padding: "20% 10% 0% 10%",
    width: "100vw",
    height: "100vh"
  },
  item: {
    textAlign: "center"
  },
  button: {
    height: "50vh",
    width: "80%",
    backgroundColor: "#FFFFFF",
    borderTop: "5px solid #2E3B52",
    transition: "transform 0.5s ease-in-out",
    "&:hover": {
      transform: "translateY(-3vh);",
      color: "#F4F7FC"
    },
    boxShadow: "0px 6px 4px rgba(0, 0, 0, 0.2)"
  },
  icon: {
    fontSize: "6em"
  },
  buttonText: {
    fontFamily: fontFamily,
    fontSize: "1.45em"
  }
};
