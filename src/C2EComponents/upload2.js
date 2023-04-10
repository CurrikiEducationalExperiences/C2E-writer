import React from 'react';

class FileUploadDownload extends React.Component {
  handleFileUpload = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];

    // Upload file
    const uploadResponse = await fetch('https://example.com/upload', {
      method: 'POST',
      body: file
    });

    // Handle upload response
    if (uploadResponse.ok) {
      // File uploaded successfully, now download file
      const downloadResponse = await fetch('https://example.com/download', {
        method: 'GET'
      });

      // Handle download response
      if (downloadResponse.ok) {
        const blob = await downloadResponse.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const downloadLink = document.createElement('a');
        downloadLink.href = downloadUrl;
        downloadLink.download = 'downloaded_file.ext'; // Replace with desired filename
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        window.URL.revokeObjectURL(downloadUrl);
      } else {
        // Handle download error
        console.error('Failed to download file:', downloadResponse.status, downloadResponse.statusText);
      }
    } else {
      // Handle upload error
      console.error('Failed to upload file:', uploadResponse.status, uploadResponse.statusText);
    }
  };

  render() {
    return (
      <div>
        <h1>File Upload & Download Example</h1>
        <input type="file" onChange={this.handleFileUpload} />
      </div>
    );
  }
}

export default FileUploadDownload;