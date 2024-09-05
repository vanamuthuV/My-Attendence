import React from "react";

const Footer = () => {
  // Define inline styles for the footer
  const footerStyle = {
    backgroundColor: "#FF0000", // Red background color
    color: "#FFFFFF", // White text color
    padding: "12px 0", // Vertical padding
    marginTop: "40px", // Top margin
    textAlign: "center", // Center-align text
    fontFamily: "'Fira Code', monospace", // Fira Code font family
    borderTop: "4px solid #FFFFFF", // Top border for design accent
  };

  const linkStyle = {
    color: "#FFFFFF", // White text color
    margin: "0 6px", // Horizontal margin between links
    textDecoration: "none", // Remove underline
    fontFamily: "'Fira Code', monospace", // Fira Code font family
    fontWeight: "500", // Medium font weight
    transition: "color 0.3s ease", // Smooth transition for hover effects
  };

  const linkHoverStyle = {
    color: "#FFCCCC", // Light red color on hover
  };

  const handleMouseOver = (e) => {
    e.target.style.color = linkHoverStyle.color;
  };

  const handleMouseOut = (e) => {
    e.target.style.color = linkStyle.color;
  };

  return (
    <footer style={footerStyle}>
      <div>
        {/* Developed by Information */}
        <p style={{ fontSize: "14px", margin: "6px 0" }}>
          Developed by Vanamuthu V
        </p>

        {/* Social Links as Text Links */}
        <div style={{ margin: "8px 0" }}>
          <a
            href="https://www.linkedin.com/in/vanamuthuv"
            style={linkStyle}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/vanamuthuv"
            style={linkStyle}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            GitHub
          </a>

          <a
            href="https://x.com/VanamuthuV"
            style={linkStyle}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            Twitter
          </a>
          <a
            href="https://www.instagram.com/vanamuthuv"
            style={linkStyle}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            Instagram
          </a>
        </div>

        {/* Copyright Information */}
        <p style={{ fontSize: "12px", margin: "4px 0" }}>
          &copy; 2024 Attendance Management System. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
