// Google Drive Download Tracker

// Function to track download events
function trackDownload(pluginName) {
  // Show email collection modal instead of directly downloading
  showEmailModal(pluginName);

  // Prevent default link behavior
  return false;
}

// Store email and initiate download
function submitEmail(pluginName, email) {
  // Validate email
  if (!isValidEmail(email)) {
    alert("Please enter a valid email address");
    return false;
  }

  // Log the download event to console (for debugging)
  console.log("Plugin download tracked:", pluginName, "Email:", email);

  // Track with Google Analytics if available
  if (typeof gtag === "function") {
    gtag("event", "plugin_download", {
      event_category: "Plugins",
      event_label: pluginName,
      value: 1,
    });
  }

  // Store email in localStorage
  const emailsKey = "moody_plugin_emails";
  let emails = JSON.parse(localStorage.getItem(emailsKey) || "[]");
  emails.push({
    plugin: pluginName,
    email: email,
    date: new Date().toISOString(),
  });
  localStorage.setItem(emailsKey, JSON.stringify(emails));

  // Store download count in localStorage
  const downloadKey =
    "moody_plugin_" + pluginName.replace(/\s+/g, "_").toLowerCase();
  let downloadCount = localStorage.getItem(downloadKey) || 0;
  downloadCount = parseInt(downloadCount) + 1;
  localStorage.setItem(downloadKey, downloadCount);

  // Hide modal
  const modal = document.getElementById("emailModal");
  if (modal) {
    modal.style.display = "none";
  }

  // Initiate download
  const fileId = getFileIdForPlugin(pluginName);
  if (fileId) {
    window.open(getGoogleDriveDownloadLink(fileId), "_blank");
  }

  return false;
}

// Format Google Drive link for direct download
function getGoogleDriveDownloadLink(fileId) {
  return `https://drive.google.com/uc?export=download&id=${fileId}`;
}

// Get file ID for a plugin
function getFileIdForPlugin(pluginName) {
  const fileIds = {
    "Moody P1": "1ZldM6xkGUxp7kgfauoxFmNTwPEIqhWED",
  };
  return fileIds[pluginName];
}

// Show email collection modal
function showEmailModal(pluginName) {
  // Create modal if it doesn't exist
  let modal = document.getElementById("emailModal");

  if (!modal) {
    modal = document.createElement("div");
    modal.id = "emailModal";
    modal.className = "email-modal";

    const modalContent = `
      <div class="email-modal-content">
        <span class="close-modal">&times;</span>
        <h2>Download ${pluginName}</h2>
        <p>Please enter your email to download this plugin:</p>
        <form id="emailForm">
          <input type="email" id="emailInput" placeholder="Your email address" required>
          <button type="submit">Download Now</button>
        </form>
      </div>
    `;

    modal.innerHTML = modalContent;
    document.body.appendChild(modal);

    // Add event listeners
    modal.querySelector(".close-modal").addEventListener("click", function () {
      modal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });

    // Add form submit handler
    const form = document.getElementById("emailForm");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = document.getElementById("emailInput").value;
      submitEmail(pluginName, email);
    });

    // Add modal styles if not already present
    if (!document.getElementById("modalStyles")) {
      const style = document.createElement("style");
      style.id = "modalStyles";
      style.textContent = `
        .email-modal {
          display: none;
          position: fixed;
          z-index: 1000;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0,0,0,0.7);
        }
        .email-modal-content {
          background-color: #fff;
          margin: 15% auto;
          padding: 30px;
          border-radius: 5px;
          max-width: 500px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.3);
          position: relative;
        }
        .close-modal {
          position: absolute;
          top: 10px;
          right: 15px;
          font-size: 24px;
          cursor: pointer;
        }
        #emailForm {
          margin-top: 20px;
          display: flex;
          flex-direction: column;
        }
        #emailInput {
          padding: 10px;
          margin-bottom: 15px;
          font-size: 16px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        #emailForm button {
          padding: 12px;
          background-color: #111;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
        }
        #emailForm button:hover {
          background-color: #333;
        }
      `;
      document.head.appendChild(style);
    }
  }

  // Update modal content for this plugin
  modal.querySelector("h2").textContent = `Download ${pluginName}`;

  // Display the modal
  modal.style.display = "block";
}

// Email validation
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
