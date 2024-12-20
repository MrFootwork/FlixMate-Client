import axios from 'axios'
import React from 'react'
import config from '../../config'

function InstallationGuide() {
  function downloadExtension() {
    axios
      .get(config.API_URL + '/download-extension', {
        headers: {
          Authorization: `Bearer ${window.localStorage.flixmateToken}`,
        },
        responseType: 'blob',
      })
      .then(response => {
        // Create a blob from the response data
        const blob = new Blob([response.data], {
          type: response.headers['content-type'],
        })

        // Create a temporary anchor element
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob) // Create a URL for the blob
        link.download = 'FlixMate-Extension.zip' // Suggested filename

        // Programmatically trigger the download
        link.click()

        // Clean up the URL object
        window.URL.revokeObjectURL(link.href)

        // Show a helpful alert or UI message
        alert(
          'The file has been downloaded. You can find it in your Downloads folder. 👉'
        )
      })
      .catch(error => console.error('DOWNLOAD ERROR: ', error))
  }

  return (
    <div>
      <ol>
        <li>
          🚀 First, download the FlixMate Extension by clicking this button 👉{' '}
          <button onClick={downloadExtension}>FlixMate Extension ⬇️</button>
        </li>
        <li>
          📂 Next, open your Downloads folder and find the file called
          "FlixMate-Extension.zip". Right-click it and select "Extract All" (or
          unzip it however you like!).
        </li>
        <li>
          🌐 Open Chrome and go to your Extensions Manager. Here's how:
          <p>... ➡️ Extensions ➡️ Manage Extensions</p>
          <p>
            📝 Or simply copy this URL <code>chrome://extensions/</code>, paste
            it into the browser's address bar, and hit Enter.
          </p>
        </li>
        <li>
          🛠️ Turn on "Developer Mode" at the top right corner of the Extensions
          Manager. You'll see a little toggle switch—just flip it!
        </li>
        <li>
          📥 Now, drag and drop the unzipped folder (called
          "FlixMate-Extension") straight into the Extensions Manager. That's
          it—Chrome will take care of the rest!
        </li>
        <li>
          ✅ You should now see the FlixMate Extension listed in the Extensions
          Manager. Almost done!
        </li>
        <li>
          🔧 Click the "Details" button on the FlixMate Extension and turn on
          "Allow access to file URLs." This step is super important!
        </li>
        <li>
          🎉 You're all set! FlixMate is ready to make your Netflix experience
          better than ever. 🍿 Happy streaming!
        </li>
      </ol>
    </div>
  )
}

export default InstallationGuide
