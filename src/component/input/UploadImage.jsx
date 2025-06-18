import React, { useState } from 'react';
import api from '../../api/axiosInstance';

function UploadImage() {
  const [file, setFile] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    if (!file) return;

    const fileType = file.type; // ex: image/png
    const fileName = file.name;

    try {
      // 1. Presigned URL 요청
      const { data } = await api.get(`/s3/presigned-url`, {
        params: {
          fileName,
          contentType: fileType,
        },
      });

      const { presignedUrl, accessUrl } = data;

      // 2. S3에 업로드
      await api.put(presignedUrl, file, {
        headers: { 'Content-Type': fileType },
      });

      // 3. 업로드된 이미지 URL 저장
      setUploadedUrl(accessUrl);
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Upload failed. Check console for details.');
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={uploadFile}>Upload</button>

      {uploadedUrl && (
        <div>
          <p>Image URL:</p>
          <a href={uploadedUrl} target="_blank" rel="noopener noreferrer">
            {uploadedUrl}
          </a>
          <br />
          <img src={uploadedUrl} alt="uploaded" style={{ maxWidth: '300px' }} />
        </div>
      )}
    </div>
  );
}

export default UploadImage;
