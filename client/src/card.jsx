import React from "react";

const TestCard = () => {
  // Define inline styles for the card and its contents
  const cardStyle = {
    width: "250px", // Smaller width for the card
    margin: "20px 20px", // Center card horizontally and add top margin
    padding: "15px", // Padding inside the card
    backgroundColor: "#FFFFFF", // White background for the card
    border: "1px solid #dddddd", // Light border color
    borderRadius: "8px", // Rounded corners
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
    textAlign: "center", // Center-align text
  };

  const headingStyle = {
    marginTop: "0", // Remove top margin
    color: "#333333", // Dark text color for contrast
    fontSize: "16px", // Font size for heading
  };

  const noticeStyle = {
    fontSize: "14px", // Font size for notice text
    color: "#333333", // Dark text color
    margin: "10px 0", // Margin around notice text
  };

  const remarkStyle = {
    fontSize: "12px", // Font size for remark text
    color: "#666666", // Slightly lighter color for remarks
    marginTop: "10px", // Margin above remark text
    lineHeight: "1.4", // Increase line height for readability
  };

  return (
    <div style={cardStyle}>
      <h2 style={headingStyle}>Test Application Notice</h2>
      <p style={noticeStyle}>
        Use the following credentials to access the test application:
        <br />
        <strong>ID:</strong> cvraman
        <br />
        <strong>Password:</strong> 1234
      </p>
      <p style={remarkStyle}>
        These credentials are provided by the administration for testing
        purposes only. Not everyone has access. Please maintain discipline and
        avoid unnecessary actions.
      </p>
    </div>
  );
};

export default TestCard;
