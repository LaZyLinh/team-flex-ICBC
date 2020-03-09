function floorExists(id) {
  // TODO: check sql database
  return true;
}

const FORM_ID = "floorPlanImage";
const MAX_FILESIZE = 20971520; // 20 MB
const FLOORPLANS_PUBLIC_FOLDER = "floorplans";

function requestIsGood(req) {
  const id = req.body.floorId;
  if (!floorExists(id)) {
    res.status(400);
    res.send(`Invalid floor ID: ${id}`);
    return false;
  }
  if (req.files.length === 0) {
    res.status(400);
    res.send("No files uploaded at all");
    return false;
  }
  const file = req.files[FORM_ID];
  if (!file) {
    res.status(400);
    res.send(`No file found for form ID ${FORM_ID}`);
    return false;
  }
  if (file.size > MAX_FILESIZE) {
    res.status(400);
    res.send(`Max size is ${MAX_FILESIZE} bytes but the file uploaded was ${file.size} bytes`);
    return false;
  }
  return true;
}

module.exports = {
  uploadFloorPlan:
    async (req, res, next) => {
      if (requestIsGood(req)) {
        const id = req.body.floorId;
        const file = req.files[FORM_ID];
        const path = `./public/${FLOORPLANS_PUBLIC_FOLDER}/${id}.jpg`;
        file.mv(path);
        console.log(`Done putting the upload in ${path}.`);
        res.status(200);
        res.send("OK");
      }
    }
};