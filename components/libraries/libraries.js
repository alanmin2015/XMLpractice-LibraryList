const jsdom = require("jsdom");
const { JSDOM } = jsdom;

var xml;
const parkNS = "http://www.example.org/PFRMapData";

async function loadLibraries() {
  if (xml == undefined) {
    let response = await fetch(
      "http://www.torontopubliclibrary.ca/data/library-data.kml",
      {
        method: "get",
        headers: {
          "Content-Type": "application/xml"
        }
      }
    );
    //convert XML string to XML DOM document
    data = new JSDOM(await response.text(), { contentType: "application/xml" });
    xml = data.window.document; //set the xml to the XML DOM document which we can query using DOM methods
  }
  return xml;
}
async function loadbranches() {
  xml = await loadLibraries();
  //xml.getElementsByTagName("Location");
  //xml.querySelectorAll("Location");
return xml.querySelectorAll("Placemark");
}
async function getBranchById(id) {
  xml = await loadLibraries();
 
  return  xml.querySelector(`Placemark[id = '${id}`);
}

module.exports = {
  loadLibraries,
  loadbranches,
  getBranchById
};