"use strict";

browser.browserAction.onClicked.addListener(() => {
    
  const createData = {
    type: "detached_panel",
    url: "html/popup.html",
    allowScriptsToClose: true
  };
  const creating = browser.windows.create(createData); 
});
