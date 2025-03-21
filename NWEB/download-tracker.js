// Google Drive Download Tracker

// Function to track download events
function trackDownload(pluginName) {
  // Log the download event to console (for debugging)
  console.log("Plugin download tracked:", pluginName);

  // Track with Google Analytics if available
  if (typeof gtag === "function") {
    gtag("event", "plugin_download", {
      event_category: "Plugins",
      event_label: pluginName,
      value: 1,
    });
  }

  // Store download count in localStorage as a simple client-side tracker
  // Note: This is only for the current user's browser, not a true global counter
  const downloadKey =
    "moody_plugin_" + pluginName.replace(/\s+/g, "_").toLowerCase();
  let downloadCount = localStorage.getItem(downloadKey) || 0;
  downloadCount = parseInt(downloadCount) + 1;
  localStorage.setItem(downloadKey, downloadCount);

  // You could also send this data to a server endpoint for accurate tracking
  // Using a fetch request to your own endpoint if you have one
  /*
  fetch('https://your-server.com/track-download', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      plugin: pluginName,
      timestamp: new Date().toISOString()
    })
  });
  */

  // Return true to allow the default link behavior
  return true;
}

// Format Google Drive link for direct download
function getGoogleDriveDownloadLink(fileId) {
  return `https://drive.google.com/uc?export=download&id=${fileId}`;
}
