import React, { useState, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { CssBaseline, AppBar, Box, Typography, Button, Avatar, Popover, IconButton, useMediaQuery } from '@mui/material'
import { Link } from 'react-router-dom'

import HomeIcon from '@mui/icons-material/Home'

import Login from './views/Login'
import Register from './views/Register'
import HomePage from './views/HomePage'
import DocumentPage from './views/TravelPage'
import SeacrhPage from './views/SearchPage'
import AddTravel from './views/AddTravel'
import EditProfile from './views/EditProfile'
import History from './views/History'
import TravelPage from './views/TravelPage'
import EditTravel from './views/EditTravel'
import NotFound from './views/NotFound'
import { color, hover, transform } from 'framer-motion'
import { Opacity } from '@mui/icons-material'

// import หน้าอื่น ๆ เช่น HomePage, Login, Register ฯลฯ

function App() {
  //Local Storage Listener------------------------------------------
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }

    const handleStorageChange = () => {
      const newUserData = localStorage.getItem('userData');
      setUserData(newUserData ? JSON.parse(newUserData) : null);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  //--------------------------------------------------------------------


  const [openMenu, setOpenMenu] = useState(null);

  const handleOpenMenu = (event) => {
    if (openMenu) {
      setOpenMenu(null);
    } else {
      setOpenMenu(event.currentTarget);
    }
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userData');
    setUserData(null);
    navigate('/login');
  };

  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <Box sx={{ ...box_all, px: useMediaQuery('(max-width:820px)') ? '4vh' : '8vh' }}>
      <CssBaseline />
      {/* AppBar */}
      <Box sx={{ height: '80px' }}>
        <AppBar sx={appbar}>
          {useMediaQuery('(max-width:820px)') ? (
            <>
              <IconButton sx={{ ml: '5vh' }} onClick={() => navigate('/search')}>
                <HomeIcon sx={{ color: 'white' }} />
              </IconButton>
            </>
          ) : (
            <>
              <Typography sx={appbar_name} onClick={() => navigate('/search')}>🛺 AMAZING THAILAND 2025</Typography>
            </>
          )}

          <Box sx={appbar_box}>
            {userData?.userId ? (
              <>
                {!isMobile && (
                  <Typography sx={{ fontSize: '1.2rem' }}>
                    {userData?.userName ? userData.userName : 'Username'}
                  </Typography>
                )}
                <Box>
                  <Avatar
                    src={userData?.userImage
                      ? `https://yxkmuhpwtkslojxocvxo.supabase.co/storage/v1/object/public/atimage/user/${userData.userImage}`
                      : undefined}
                    sx={{ cursor: 'pointer', height: '3rem', width: '3rem' }}
                    onClick={handleOpenMenu}
                  />
                  <Popover
                    sx={{ mt: 2 }}
                    open={Boolean(openMenu)}
                    anchorEl={openMenu}
                    onClose={() => setOpenMenu(null)}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}
                  >
                    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1, }}>
                      <Button variant="contained" sx={menu_bt} onClick={() => navigate('/add-travel')}>อัพโหลดการเดินทาง</Button>
                      <Button variant="contained" sx={menu_bt} onClick={() => navigate('/history')}>ดูประวัติการอัพโหลด</Button>
                      <Button variant="contained" sx={menu_bt} onClick={() => navigate('/edit-profile')}>แก้ไขข้อมูลส่วนตัว</Button>
                    </Box>
                  </Popover>
                </Box>
                <Typography sx={{ fontSize: '2rem' }}>I</Typography>
                <Button sx={appbar_button} onClick={handleLogout}>ออกจากระบบ</Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button sx={{ ...appbar_button, backgroundColors : 'white'}}>เข้าสู่ระบบ</Button>
                </Link>
                <Typography sx={{ fontSize: '2rem' }}>I</Typography>
                <Link to="/register">
                  <Button sx={appbar_button}>สร้างบัญชีใหม่</Button>
                </Link>
              </>
            )}
          </Box>
        </AppBar>
      </Box>

      {/* Routes */}
      <Box sx={{ height: '100%', width: '100%' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/document" element={<DocumentPage />} />
          <Route path="/search" element={<SeacrhPage />} />
          <Route path="/add-travel" element={<AddTravel />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/edit-travel/:tripId" element={<EditTravel />} />

          <Route path="/history" element={<History />} />
          <Route path="/travel-page/:tripId" element={<TravelPage />} />
          <Route path="*" element={<NotFound />} />


        </Routes>
      </Box>
    </Box>
  );
}

export default App;

const box_all = {
  width: '100%',
}

const appbar = {
  height: '80px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#FF9800',
  px: 3,
};

const appbar_name = {
  marginLeft: '10vh',
  color: 'white',
  fontSize: '24px',
  fontWeight: 'bold',
  transform: 'scaleY(1.5)',
  transformOrigin: 'center',
  cursor: 'pointer',
  '&:hover': {
    opacity: '0.75',
    transition: '0.5s',
  }
};

const appbar_box = {
  marginLeft: 'auto',
  marginRight: '7.5vh',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '20px',
};

const appbar_button = {
  color: 'white',
  fontSize: '16px',
};

const menu_bt = {
  fontSize: '18px',
  backgroundColor: '#FF9800',
};
