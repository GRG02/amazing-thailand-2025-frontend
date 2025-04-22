import React, { useState, useEffect } from 'react'
import { Typography, Box, Grid, Paper, Button, TextField, Stack, Autocomplete, Avatar } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import CommentImg from '../assets/comments.png'
import ViewImg from '../assets/views.png'


function SearchPage() {

  const [page, setPage] = useState(1);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const options = ['กระบี่', 'กรุงเทพมหานคร', 'กาญจนบุรี', 'กาฬสินธุ์', 'กำแพงเพชร', 'ขอนแก่น', 'จันทบุรี', 'ฉะเชิงเทรา', 'ชลบุรี', 'ชัยนาท', 'ชัยภูมิ', 'ชุมพร', 'เชียงราย', 'เชียงใหม่', 'ตรัง', 'ตราด', 'ตาก', 'นครนายก',
    'นครปฐม', 'นครพนม', 'นครราชสีมา', 'นครศรีธรรมราช', 'นครสวรรค์', 'นนทบุรี', 'นราธิวาส', 'น่าน', 'บึงกาฬ', 'บุรีรัมย์', 'ปทุมธานี', 'ประจวบคีรีขันธ์', 'ปราจีนบุรี', 'ปัตตานี', 'พระนครศรีอยุธยา', 'พะเยา', 'พังงา', 'พัทลุง',
    'พิจิตร', 'พิษณุโลก', 'เพชรบุรี', 'เพชรบูรณ์', 'แพร่', 'ภูเก็ต', 'มหาสารคาม', 'มุกดาหาร', 'แม่ฮ่องสอน', 'ยโสธร', 'ยะลา', 'ร้อยเอ็ด', 'ระนอง', 'ระยอง', 'ราชบุรี', 'ลพบุรี', 'ลำปาง', 'ลำพูน', 'เลย', 'ศรีสะเกษ', 'สกลนคร',
    'สงขลา', 'สตูล', 'สมุทรปราการ', 'สมุทรสงคราม', 'สมุทรสาคร', 'สระแก้ว', 'สระบุรี', 'สิงห์บุรี', 'สุโขทัย', 'สุพรรณบุรี', 'สุราษฎร์ธานี', 'สุรินทร์', 'หนองคาย', 'หนองบัวลำภู', 'อ่างทอง', 'อำนาจเจริญ', 'อุดรธานี', 'อุตรดิตถ์',
    'อุทัยธานี', 'อุบลราชธานี'];
  const keywordsList = [
    'วิวสวย', 'ทะเล', 'ภูเขา', 'น้ำตก', 'ป่า', 'เกาะ', 'ดำน้ำ', 'ถ้ำ', 'แม่น้ำ', 'จุดชมวิว',
    'วัด', 'โบราณสถาน', 'พิพิธภัณฑ์', 'งานวัด', 'ประเพณี', 'ตลาดโบราณ', 'คาเฟ่', 'ร้านกาแฟ',
    'ของกินอร่อย', 'ช้อปปิ้ง', 'ถนนคนเดิน', 'แหล่งเที่ยวกลางคืน', 'ปีนเขา', 'ล่องแก่ง', 'แคมป์ปิ้ง',
    'ขับรถเที่ยว', 'นั่งเรือ', 'ปั่นจักรยาน', 'เดินป่า', 'ราคาถูก', 'คุ้มค่า', 'หรูหรา', 'ฟรีค่าเข้า',
    'ถ่ายรูปสวย', 'จุดเช็คอิน', 'มุมมหาชน', 'อุทยานแห่งชาติ', 'ทุ่งดอกไม้', 'ท่องเที่ยวเชิงนิเวศ',
    'สวนสาธารณะ', 'ศูนย์การค้า', 'แหล่งชุมชน', 'บ้านไม้', 'ร้านอาหาร', 'บาร์', 'ค็อฟฟี่ช็อป',
    'ทัวร์', 'วิถีชีวิตท้องถิ่น', 'เที่ยวตามฤดูกาล', 'ทะเลสาบ', 'ภูมิอากาศเย็นสบาย'
  ];

  const formatDate = (dateString) => {
    const monthsThai = [
      'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
      'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
    ];

    const [year, month, day] = dateString.split('-');
    return `${parseInt(day)} ${monthsThai[parseInt(month) - 1]} ${year}`;
  };

  const [trip, setTrip] = useState([])

  useEffect(() => {
    const getAllTrips = async (page) => {
      try {
        //https://n8n-bb7z.onrender.com/webhook/c502a429-0ea4-4c9f-a86d-5bc928db036d/at/trip-search/:page
        const response = await axios.get(`https://n8n-bb7z.onrender.com/webhook/c502a429-0ea4-4c9f-a86d-5bc928db036d/at/trip-search/${page}`);
        console.log(response.data.body);
        setTrip(response.data.body);
      } catch (error) {
        console.error(error);
      }
    };
    getAllTrips();
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(/^[a-zA-Z0-9ก-๙\s]*$/, 'ข้อความมีอักขระพิเศษที่ไม่ได้รับอนุญาต')
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'all',
  });

  const handleSearchTrip = async (data) => {

    const isNameEmpty = !data.name || data.name === '';
    const isProvincesEmpty = !Array.isArray(data.provinces) || data.provinces.length === 0;
    const isKeywordsEmpty = !Array.isArray(data.keywords) || data.keywords.length === 0;

    if (isNameEmpty && isProvincesEmpty && isKeywordsEmpty) {
      alert('กรุณากรอกข้อมูลอย่างน้อย 1 ช่อง...');
      return;
    }

    const formData = new FormData();
    if (data.name && data.name !== '') {
      formData.append('name', data.name);
    }
    if (Array.isArray(data.provinces) && data.provinces.length > 0) {
      data.provinces.forEach((provinces) => {
        formData.append('provinces', provinces);
      });
    }
    if (Array.isArray(data.keywords) && data.keywords.length > 0) {
      data.keywords.forEach((keywords) => {
        formData.append('keywords', keywords);
      });
    }

    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await axios.post(`https://n8n-bb7z.onrender.com/webhook/c502a429-0ea4-4c9f-a86d-5bc928db036d/at/trip-search/engine/${page}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data.body);
      setTrip(response.data.body);
    } catch (error) {
      console.error(error);
    }
  }

  const handleKeywordClick = async (keyword) => {

    const formData = new FormData();

    formData.append('keywords', keyword);

    try {
      const response = await axios.post(`https://n8n-bb7z.onrender.com/webhook/c502a429-0ea4-4c9f-a86d-5bc928db036d/at/trip-search/keyword/${page}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data.body);
      setTrip(response.data.body);
    } catch (error) {
      console.error(error);
    }
  }

  const handleTripClick = async (tripId, tripViews) => {

    navigate(`/travel-page/${tripId}`)

    const views = tripViews + 1

    const formData = new FormData();

    formData.append('tripViews', views);

    try {
      const response = await axios.post(`https://n8n-bb7z.onrender.com/webhook/c502a429-0ea4-4c9f-a86d-5bc928db036d/at/trip/viewscore/${tripId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  const navigate = useNavigate();

  return (
    <>
      <Grid container spacing={2} sx={grid}>
        <Grid size={{ xds: 12, sm: 6, md: 3 }}>
          <Box sx={{ ...sort, px: 2 }}>
            <Button variant="contained" fullWidth sx={upload_travel_bt}
              onClick={() => {
                if (!userData) {
                  alert('กรุณาเข้าสู่ระบบก่อนที่จะอัพโหลดการเดินทางของคุณ');
                  return;
                }
                navigate('/add-travel');
              }}>
              เพิ่มการเดินทาง
            </Button>
            <form style={form} onSubmit={handleSubmit(handleSearchTrip)}>
              <Stack spacing={2}>
                <Typography sx={small_text}>พิมพ์เพื่อค้นหา</Typography>
                <TextField
                  fullWidth sx={tf}
                  label="ค้นหา..."
                  {...register('name')}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
                <Typography sx={small_text}>ชื่อจังหวัด</Typography>
                <Controller
                  name="provinces"
                  control={control}
                  defaultValue={[]}
                  render={({ field }) => (
                    <Autocomplete
                      sx={tf}
                      multiple
                      options={options}
                      onChange={(_, value) => field.onChange(value)}
                      value={field.value || []}
                      renderInput={(params) => (
                        <TextField {...params} label="เลือกจังหวัด..." />
                      )}
                    />
                  )}
                />

                <Typography sx={small_text}>ประเภท, คำค้น</Typography>
                <Controller
                  name="keywords"
                  control={control}
                  defaultValue={[]}
                  render={({ field }) => (
                    <Autocomplete
                      sx={tf}
                      multiple
                      options={keywordsList}
                      onChange={(_, value) => field.onChange(value)}
                      value={field.value || []}
                      renderInput={(params) => (
                        <TextField {...params} label="เลือกคีย์เวิร์ด..." />
                      )}
                    />
                  )}
                />
                <Box sx={{ height: '20px' }} />
                <Button variant="outlined" fullWidth sx={search_bt} type='submit'>
                  ค้นหา
                </Button>
              </Stack>
            </form>
            <Paper sx={{ width: '100%', borderRadius: '10px' }}>
              <Box sx={{ ...keyword_box, backgroundColor: '#FF9800' }}>
                <Typography color="white" ml={2} fontWeight="bold">Keyword</Typography>
              </Box>

              <Grid container spacing={2} sx={{ width: '100%', p: 2 }}>
                {keywordsList.map((label) => (
                  <Grid item key={label} xs={12} sm={6} md={4}>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        backgroundColor: '#FFE0B2', // ส้มอ่อน
                        color: '#808000', // สีฟ้า
                        fontSize: '16px',
                        fontWeight: 'bold',
                        borderRadius: '12px',
                        boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
                        '&:hover': {
                          backgroundColor: '#FFCC80', // ส้มเข้มนิดหน่อยตอน hover
                        },
                        textTransform: 'none', // ป้องกันตัวพิมพ์ใหญ่ทั้งหมด
                      }}
                      onClick={() => handleKeywordClick(label)}
                    >
                      {label}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Box>
        </Grid>
        <Grid size={{ xds: 12, sm: 6, md: 9 }}>
          <Box sx={{ ...sort, px: 2 }}>
            <Grid container spacing={1} sx={{ backgroundColor: '', width: '100%' }}>
              {trip.map((trip) => (
                <Grid item key={trip.tripId} size={{ xds: 12, sm: 12, md: 6, lg: 3 }}>
                  <Paper elevation={5} sx={travel_card} onClick={() => handleTripClick(trip.tripId, trip.tripViews)}>
                    <Avatar
                      variant="square"
                      src={`https://yxkmuhpwtkslojxocvxo.supabase.co/storage/v1/object/public/atimage/trip/${trip.tripImage}`}
                      sx={{ width: '100%', height: '50%', objectFit: 'cover' }}
                    />
                    <Box sx={{ padding: 1, backgroundColor: '', width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>{trip.tripPlace}</Typography>
                      <Box sx={{ height: '10px' }} />
                      <Typography sx={{ fontSize: '14px' }}>จังหวัด - {trip.tripProvince}</Typography>
                      <Typography sx={{ fontSize: '14px' }}>ค่าใช้จ่าย - {trip.tripCost ? trip.tripCost : 'ไม่เปิดเผยค่าใช้จ่าย'} บาท</Typography>
                      <Typography sx={{ fontSize: '14px' }}>
                        วันที่เริ่มทริป - {formatDate(trip.tripStartDate)}
                      </Typography>
                      <Typography sx={{ fontSize: '14px' }}>
                        วันที่จบทริป - {formatDate(trip.tripEndDate)}
                      </Typography>
                      <Box sx={{ backgroundColor: 'lightgray', width: '100%', overflow: 'hidden' }}>
                        <Typography
                          sx={{
                            fontSize: '14px',
                            display: '-webkit-box',
                            WebkitLineClamp: 2, // จำนวนบรรทัดสูงสุดที่แสดง (2 หรือปรับตามใจ)
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          รายละเอียด : {trip.tripDesc ? trip.tripDesc : 'ไม่มีรายละเอียด'}
                        </Typography>
                      </Box>
                      <Box sx={{ backgroundColor: 'orange', width: '100%', mt: 'auto', display: 'flex', justifyContent: 'row', p: 0.5, borderRadius: '25px' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'row', alignItems: 'center' }}>
                          <Avatar src={ViewImg} sx={{ width: '25px', height: '25px' }} />
                          <Typography sx={{ fontSize: '14px', ml: 0.5 }}>Views: {trip.tripViews}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'row', alignItems: 'center', ml: 'auto' }}>
                          <Typography sx={{ fontSize: '14px' }}>
                            อัพโหลด {formatDate(trip.createdAt)}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default SearchPage

const grid = {
  width: '100%',
  height: '100%',
}

const sort = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'start',
  py: 4,
  gap: '30px',
  backgroundColor: 'lightblue'
}

const big_text = {
  color: 'white',
  fontSize: '60px',
  fontWeight: 'bold',
  textAlign: 'start',
  transform: 'scaleY(1.5)',
  transformOrigin: 'center',
}

const small_text = {
  fontSize: '18px',
  textAlign: 'start',
}

const upload_travel_bt = {
  fontSize: '20px',
  fontWeight: 'bold',
  backgroundColor: '#FF9800',
  '&:hover': {
    color: '#FF9800',
    backgroundColor: 'white',
    transition: '0.5s',
  },
  borderRadius: '25px'
}

const search_bt = {
  fontSize: '20px',
  fontWeight: 'bold',
  color: '#FF9800',
  backgroundColor: 'white',
  borderRadius: '25px',
  '&:hover': {
    color: 'white',
    backgroundColor: '#FF9800',
    transition: '0.5s',
  },
}

const form = {
  width: '100%',
  padding: '20px',
  backgroundColor: '#ffcb8c',
  borderRadius: '25px'
}

const tf = {
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'white',
    borderRadius: '25px',
  }
}

const keyword_box = {
  display: 'flex', flexDirection: 'row', justifyContent: 'start', alignItems: 'center', height: '50px',
}

const travel_card = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  alignItems: 'start',
  height: '50vh',
  width: '100%',
  borderRadius: '25px',
  overflow: 'hidden',
  cursor: 'pointer',
  '&:hover': {
    transform: 'scale(0.98)',
    opacity: '0.8',
    transition: '0.5s',
  }
} 