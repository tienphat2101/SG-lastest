import React from 'react';

const Videocall = () => {
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <iframe
        src="https://video-call-mumble.vercel.app/"
        width="100%"
        height="100%"
        style={{ border: 'none' }}
        title="Video call"
      />
    </div>
  );
};

export default Videocall;
