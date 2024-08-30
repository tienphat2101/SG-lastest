import React, { useState, useEffect } from "react";

const Flashcard = () => {
  const [containerStyle, setContainerStyle] = useState({});

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setContainerStyle({
        width: "100%",
        maxWidth: width > 768 ? "1200px" : "100%", // Chiều rộng tối đa dựa trên kích thước cửa sổ
        margin: "0 auto",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Cập nhật style khi component mount

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const iframeStyle = {
    width: "100%",
    height: "100%",
    border: "none",
  };

  return (
    <div style={containerStyle}>
      <iframe
        src="https://tienphat2101.github.io/flashcard/"
        style={iframeStyle}
        title="Flash Card"
      />
    </div>
  );
};

export default Flashcard;
