import DataUriParser from "datauri/parser.js";
import path from "path";

const getDateUrl = (file) => {
  const parser = new DataUriParser();

   if (!file) {
     throw new Error("No file provided");
   }
   if (!file.originalname) {
     throw new Error("File does not have an original name");
   }
   if (!file.buffer) {
     throw new Error("File buffer is missing");
   }

  const extName = path.extname(file.originalname).toString();
  return parser.format(extName, file.buffer);
};

export default getDateUrl;
