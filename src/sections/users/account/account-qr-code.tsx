import { useState } from 'react';

export default function QRCodeGenerator() {
  const [userName, setUserName] = useState('');
  const [qrCodeDataURL, setQRCodeDataURL] = useState('');

  const generateQRCode = async () => {
    try {
      const response = await fetch(`/api/qr_code?userName=${userName}`);

      if (response.ok) {
        const res = await response.json();
        setQRCodeDataURL(res.data.qrCodeDataURL);
      } else {
        console.error('Failed to generate QR code:', response.status);
      }
    } catch (error) {
      console.error('Failed to generate QR code:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Enter Text"
        style={{ color: 'black', marginRight: 10, width: 500 }}
      />
      <button type="button" onClick={generateQRCode}>Generate QR Code</button>
      {qrCodeDataURL && (
        <div>
          <img src={qrCodeDataURL} alt="QR Code" />
        </div>
      )}
    </div>
  );
}
