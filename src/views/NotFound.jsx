import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>404 - Page Not Found</h1>
      <p>ไม่พบหน้าที่คุณต้องการ</p>
      <Link to="/">กลับสู่หน้าหลัก</Link>
    </div>
  );
}

export default NotFound;