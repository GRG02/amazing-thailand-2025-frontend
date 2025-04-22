import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Typography, IconButton, Container } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  'https://www.thecontinenthotel.com/wp-content/uploads/2024/04/Travel.Kapook-Wat-pra-kaew.webp',
  'https://www.thefloathouseriverkwai.com/wp-content/uploads/2024/01/%E0%B8%A3%E0%B8%A7%E0%B8%A1-10-%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B9%80%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%A7%E0%B8%81%E0%B8%B2%E0%B8%8D%E0%B8%88%E0%B8%99%E0%B8%9A%E0%B8%B8%E0%B8%A3%E0%B8%B5%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%AB%E0%B9%89%E0%B8%B2%E0%B8%A1%E0%B8%9E%E0%B8%A5%E0%B8%B2%E0%B8%94-2023.webp',
  'https://www.chillpainai.com/src/wewakeup/scoop/images/e12c9c7533536486b993004bae8328c25d7d00ff.jpg',
  'https://www.ananda.co.th/blog/thegenc/wp-content/uploads/2024/02/%E0%B9%84%E0%B8%A1%E0%B9%88%E0%B8%A1%E0%B8%B5%E0%B8%8A%E0%B8%B7%E0%B9%88%E0%B8%AD-1145-x-550-px-17-1.png',
  'https://blog.drivehub.co/wp-content/uploads/2023/07/18-Wat-Huay-Pla-Kang-1024x576.jpg',
  'https://blog.one22.com/wp-content/uploads/2016/12/sukhothai_2016-01457.jpg',
  'https://blog.drivehub.co/wp-content/uploads/2023/12/15-1024x576.jpg',
  'https://amazingcouple.net/wp-content/uploads/2018/08/Roi-Et_cover.jpg',
  'https://img.kapook.com/u/2022/sutasinee/08/80.jpg',
  'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/77/f6/66/beautiful-scenery.jpg?w=1200&h=700&s=1',
  'https://www.expedia.co.th/stories/wp-content/uploads/2022/07/2.%E0%B9%80%E0%B8%81%E0%B8%B2%E0%B8%B0%E0%B8%81%E0%B8%B9%E0%B8%94-1.jpg',
  'https://www.ananda.co.th/blog/thegenc/wp-content/uploads/2024/03/%E0%B8%94%E0%B8%B5%E0%B9%84%E0%B8%8B%E0%B8%99%E0%B9%8C%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%B1%E0%B8%87%E0%B9%84%E0%B8%A1%E0%B9%88%E0%B9%84%E0%B8%94%E0%B9%89%E0%B8%95%E0%B8%B1%E0%B9%89%E0%B8%87%E0%B8%8A%E0%B8%B7%E0%B9%88%E0%B8%AD-2024-05-23T122306.610.png',
  'https://www.ananda.co.th/blog/thegenc/wp-content/uploads/2024/05/%E0%B8%94%E0%B8%B5%E0%B9%84%E0%B8%8B%E0%B8%99%E0%B9%8C%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%B1%E0%B8%87%E0%B9%84%E0%B8%A1%E0%B9%88%E0%B9%84%E0%B8%94%E0%B9%89%E0%B8%95%E0%B8%B1%E0%B9%89%E0%B8%87%E0%B8%8A%E0%B8%B7%E0%B9%88%E0%B8%AD-2024-05-20T120256.309.png',
  'https://www.kkday.com/th/blog/wp-content/uploads/Thailand_Phuket_Ashutterstock_329246918.jpg',
  'https://s.isanook.com/tr/0/ud/287/1436269/trwcopy.jpg',
  'https://blog.amari.com/wp-content/uploads/2018/09/VangVieng_149.jpg',
  'https://mushroomtravelpage.b-cdn.net/wp-content/uploads/2018/06/Pic-1-4-1024x616.jpg',
];

function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Box
        sx={{
          background: 'linear-gradient(to bottom right, #fdfcfb, #e2d1c3)',
          backgroundImage: 'url("https://www.transparenttextures.com/patterns/diamond-upholstery.png")',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          px: 2,
          py: 4,
        }}
      >
        <Container maxWidth="lg">
          {/* Carousel */}
          <Box
            position="relative"
            width="100%"
            height="500px"
            overflow="hidden"
            borderRadius="25px"
            boxShadow="0 12px 32px rgba(0, 0, 0, 0.25)"
            mb={4}
            sx={{ backgroundColor: '#ccc' }}
          >
            <IconButton
              onClick={handlePrev}
              sx={{
                position: 'absolute',
                top: '50%',
                left: 10,
                zIndex: 2,
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(255,255,255,0.75)',
                '&:hover': { backgroundColor: 'white' }
              }}
            >
              <ArrowBackIos />
            </IconButton>

            <AnimatePresence mode="wait">
              <motion.div
                key={images[currentIndex]}
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                style={{ width: '100%', height: '100%', position: 'relative' }}
              >
                <img
                  src={images[currentIndex]}
                  alt={`Slide ${currentIndex}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '25px',
                  }}
                />
                <Box
                  position="absolute"
                  top={0}
                  left={0}
                  width="100%"
                  height="100%"
                  sx={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0))',
                    borderRadius: '25px'
                  }}
                />
              </motion.div>
            </AnimatePresence>

            <IconButton
              onClick={handleNext}
              sx={{
                position: 'absolute',
                top: '50%',
                right: 10,
                zIndex: 2,
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(255,255,255,0.75)',
                '&:hover': { backgroundColor: 'white' }
              }}
            >
              <ArrowForwardIos />
            </IconButton>
          </Box>

          {/* ปุ่มลิงก์ไปหน้าค้นหา */}
          <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Box display="flex" justifyContent="center" mb={4}>
              <Button
                component={Link}
                to="/search"
                variant="contained"
                sx={{
                  borderRadius: '50px',
                  fontWeight: 'bold',
                  px: 6,
                  py: 2,
                  fontSize: '1.2rem',
                  background: 'linear-gradient(90deg, #F7971E 0%, #FFD200 100%)',
                  color: '#000',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
                  '&:hover': {
                    background: 'linear-gradient(90deg, #FFD200 0%, #F7971E 100%)',
                  },
                }}
              >
                🌏 ไปยังหน้าการเดินทาง
              </Button>
            </Box>
          </motion.div>

          {/* ข้อความอธิบาย */}
          <Box
            maxWidth="950px"
            mx="auto"
            textAlign="center"
            px={4}
            py={3}
            borderRadius="20px"
            boxShadow="0 8px 20px rgba(0,0,0,0.1)"
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <Typography variant="h4" fontWeight="bold" color="#333" gutterBottom>
              ✨ ยินดีต้อนรับสู่แหล่งรวมข้อมูลการเดินทางในประเทศไทย
            </Typography>
            <Typography variant="h6" color="#666" sx={{ mb: 1.5 }}>
              แรงบันดาลใจในการท่องเที่ยวทุกภาค ทุกเมือง ทุกมุมที่คุณอาจไม่เคยไป
            </Typography>
            <Typography variant="body1" sx={{ color: '#555', fontSize: '1.1rem', lineHeight: 1.8 }}>
              เว็บไซต์นี้เป็นพื้นที่สำหรับเก็บรวบรวมเอกสารอ้างอิงและรีวิวเกี่ยวกับการเดินทางในประเทศไทย
              ไม่ว่าจะเป็นสถานที่ท่องเที่ยวทางธรรมชาติ เมืองเก่า วิถีชีวิต หรือคาเฟ่น่ารักๆ ที่รอให้คุณค้นพบ
            </Typography>
          </Box>
        </Container>
      </Box>
    </motion.div>
  );
}

export default HomePage;
