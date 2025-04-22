import React from 'react'
import { Typography, Avatar, Box, TextField, Grid, Button, IconButton } from '@mui/material'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { format, addHours, set } from 'date-fns';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function TravelPage() {
  const [userData, setUserData] = useState(null);
  const [trip, setTrip] = useState(null);
  const { tripId } = useParams();
  const [comment, setComment] = useState('');
  const [commentS, setCommentS] = useState([]);

  const [isEditing, setIsEditing] = useState(null);
  const [editComment, setEditComment] = useState('');

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  useEffect(() => {
    const getTripById = async () => {

      try {
        const response = await axios.get(
          `https://n8n-bb7z.onrender.com/webhook/c502a429-0ea4-4c9f-a86d-5bc928db036d/at/trip-page/${tripId}`
        );
        console.log('Trip Data:', response.data);
        setTrip(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getTripById();
  }, [tripId]);

  useEffect(() => {
    const getAllCommentsByTripId = async () => {
      try {
        const response = await axios.get(
          `https://n8n-bb7z.onrender.com/webhook/c502a429-0ea4-4c9f-a86d-5bc928db036d/at/trip-page/comment/${tripId}`
        );
        console.log(response.data.body);
        setCommentS(response.data.body);
      } catch (error) {
        console.error(error);
      }
    }

    getAllCommentsByTripId();
  }, [tripId]);

  const handleCommentPost = async () => {

    if (!userData?.userId) {
      alert('กรุณาเข้าสู่ระบบก่อน');
      return;
    }

    const formData = new FormData();
    formData.append('userId', userData.userId);
    formData.append('tripId', tripId);
    formData.append('commentText', comment);

    setComment('');

    try {
      const response = await axios.post('https://n8n-bb7z.onrender.com/webhook/at/trip-page/comment/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      setCommentS((prevCommentS) => [...prevCommentS, response.data]);
    } catch (error) {
      console.error(error);
    }
  }

  const handleUpdateComment = async (commentId) => {
    if (!userData?.userId) return;

    const formData = new FormData();

    formData.append('commentText', editComment);

    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await axios.post(`https://n8n-bb7z.onrender.com/webhook/c502a429-0ea4-4c9f-a86d-5bc928db036d/at/trip-page/comment/${commentId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      setCommentS((prevCommentS) =>
        prevCommentS.map((comment) =>
          comment.commentId === response.data.commentId ? { ...comment, ...response.data } : comment
        )
      );
      setIsEditing(null);
      setEditComment('');
    } catch (error) {
      console.error(error);
    }
  }

  const handleDeleteComment = async (commentId) => {
    if (!userData?.userId) return;

    try {
      const response = await axios.get(`https://n8n-bb7z.onrender.com/webhook/c502a429-0ea4-4c9f-a86d-5bc928db036d/at/trip-page/comment/del/${commentId}`);
      console.log(response.data);
      setCommentS((prevCommentS) => prevCommentS.filter((comment) => comment.commentId !== commentId));
    } catch (error) {
      console.error(error);
    }
  }

  const tripImageUrl = trip?.tripImage
    ? `https://yxkmuhpwtkslojxocvxo.supabase.co/storage/v1/object/public/atimage/trip/${trip.tripImage}`
    : 'https://cdn-icons-png.flaticon.com/512/847/847969.png';

  const UploaderImageUrl = trip?.userImage
    ? `https://yxkmuhpwtkslojxocvxo.supabase.co/storage/v1/object/public/atimage/user/${trip?.userImage}`
    : 'https://cdn-icons-png.flaticon.com/512/847/847969.png';

  const formatDate = (dateString) => {
    if (!dateString) return 'ไม่ระบุ'; // ถ้าไม่มีค่า คืนข้อความเลย

    const monthsThai = [
      'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
      'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
    ];

    const [year, month, day] = dateString.split('-');
    return `${parseInt(day)} ${monthsThai[parseInt(month) - 1]} ${year}`;
  };

  return (
    <Box sx={{ backgroundColor: '#FFF3E0', minHeight: '100vh', py: 6 }}>
      <Box
        sx={{
          backgroundColor: '#ffffff',
          width: '85%',
          mx: 'auto',
          p: 5,
          borderRadius: 4,
          boxShadow: '0px 6px 20px rgba(0,0,0,0.1)',
        }}
      >
        <Grid container spacing={4} justifyContent="center">
          {/* รูปพรีวิว */}
          <Grid item xs={12} md={6} lg={6} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Avatar
              variant='rounded'
              sx={{
                width: { xs: '100%', sm: 420, md: 520, lg: 560 },
                height: { xs: 240, sm: 340, md: 440, lg: 500 },
                bgcolor: '#e0e0e0',
                borderRadius: 3,
                boxShadow: 2
              }}
              src={tripImageUrl}
            />
          </Grid>

          {/* กล่อง Avatar + ข้อความ */}
          <Grid item xs={12} md={6} sx={{ flexGrow: 1, minWidth: 0 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                p: { xs: 2, sm: 3 },
                bgcolor: '#ffffff',
                borderRadius: 3,
                boxShadow: 1,
                border: '1px solid #ddd',
                height: '100%',
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'flex-start', gap: 2 }}>
                <Avatar
                  sx={{
                    height: 100,
                    width: 100,
                    bgcolor: '#424242',
                    mx: { xs: 'auto', sm: 0 },
                    boxShadow: 2
                  }}
                  src={UploaderImageUrl}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: { xs: 2, sm: 1 } }}>
                  <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
                    ผู้อัพโหลด : {trip?.userName ?? 'ไม่ทราบ'}
                  </Typography>
                  <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
                    ชื่อสถานที่ : {trip?.tripPlace ?? 'ไม่ระบุ'}
                  </Typography>
                  <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
                    จังหวัด : {trip?.tripProvince ?? 'ไม่ระบุ'}
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  position: 'relative',
                  bgcolor: '#f8f8f8',
                  height: 140, // เดิม 100 → เพิ่มเป็น 140
                  width: '100%',
                  borderRadius: 2,
                  mt: 2,
                  border: '1px dashed #bbb',
                  display: 'flex',
                  alignItems: 'start',
                  padding: 4, // เดิม 3 → เพิ่มเป็น 4
                }}
              >
                <Typography variant="body1" fontWeight="bold" color="text.secondary">
                  keywords : {trip?.body?.map(item => item.keywordName).toString()}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  mt: 2,
                }}
              >
                <Typography sx={{ fontSize: '14px' }}>
                  ค่าใช้จ่าย : {trip?.tripCost ? `${trip.tripCost} บาท` : 'ไม่ระบุ'}
                </Typography>
                <Typography sx={{ fontSize: '14px' }}>
                  วันที่เริ่มทริป : {formatDate(trip?.tripStartDate)}
                </Typography>
                <Typography sx={{ fontSize: '14px' }}>
                  วันที่จบทริป : {formatDate(trip?.tripEndDate)}
                </Typography>
                <Typography sx={{ fontSize: '14px' }}>
                  ยอดเข้าชม : {trip?.tripViews ?? 0} ครั้ง
                </Typography>
                <Typography sx={{ fontSize: '14px' }}>
                  อัพโหลดเมื่อ : {formatDate(trip?.createdAt)}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 6, p: 3, bgcolor: '#fff', borderRadius: 2, boxShadow: 1 }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ whiteSpace: 'pre-line', lineHeight: 1.8 }}
          >
            รายละเอียด : {trip?.tripDesc ?? 'ไม่ระบุ'}
          </Typography>
        </Box>

        <Box sx={{ mt: 5, border: '1px solid #ff9800', borderRadius: 5, overflow: 'hidden' }}>
          <Box sx={{ bgcolor: '#ff9800', px: 3, py: 1.5 }}>
            <Typography variant="subtitle1" fontWeight="bold" color="#fff">
              ความคิดเห็น จำนวน : {commentS?.length ?? 0} ความคิดเห็น
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

          </Box>
          <Box sx={{ bgcolor: '#fdfdfd', px: 3, py: 2 }}>
            <TextField
              fullWidth
              disabled={!userData?.userId}
              variant="outlined"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={
                userData?.userId
                  ? 'แสดงความคิดเห็นของคุณ...'
                  : 'กรุณาเข้าสู่ระบบ เพื่อแสดงความคิดเห็น...'
              }
              InputProps={{
                style: {
                  backgroundColor: '#fff',
                },
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
              <Button
                variant="outlined"
                color="inherit"
                disabled={!userData?.userId}
                onClick={() => setComment('')} // ลบข้อความทั้งหมด
                sx={{
                  borderRadius: 5,
                  px: 3,
                  py: 1,
                  fontWeight: 'bold',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                  transition: '0.3s',
                  '&:hover': {
                    borderColor: '#000',
                    backgroundColor: '#f5f5f5',
                  },
                }}
              >
                ยกเลิก
              </Button>
              <Button
                variant="contained"
                color="primary"
                disabled={!userData?.userId || !comment}
                sx={{
                  borderRadius: 5,
                  px: 3,
                  py: 1,
                  fontWeight: 'bold',
                  boxShadow: '0 3px 8px rgba(0,0,0,0.15)',
                  transition: '0.3s',
                  '&:hover': {
                    backgroundColor: '#1565c0',
                  },
                }}
                onClick={
                  () => {
                    handleCommentPost();
                  }
                }
              >
                ยืนยันความคิดเห็น
              </Button>
            </Box>
            <Box sx={{ mt: 3 }}>
              {commentS.map((commentS) => (
                <Box key={commentS.commentId} sx={{
                  display: 'flex',
                  flexDirection: isEditing === commentS.commentId ? 'column' : 'row',
                  alignItems: isEditing === commentS.commentId ? 'stretch' : 'flex-start',
                  gap: 2,
                  mb: 2,
                  backgroundColor: '#f0f0f0',
                  p: 2,
                  borderRadius: 3
                }}>
                  <Avatar
                    sx={{ width: 60, height: 60 }}
                    src={commentS?.userImage
                      ? `https://yxkmuhpwtkslojxocvxo.supabase.co/storage/v1/object/public/atimage/user/${commentS?.userImage}`
                      : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
                  />
                  <Box sx={{ gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body1" fontWeight="bold">
                        {commentS?.userName}
                      </Typography>
                      <Typography variant="body1" fontWeight="bold">
                        {format(
                          addHours(
                            new Date(commentS?.createdAt !== commentS?.updatedAt ? commentS?.updatedAt : commentS?.createdAt),
                            7
                          ),
                          'yyyy-MM-dd HH:mm'
                        )} น.
                        {commentS?.createdAt !== commentS?.updatedAt && <span> (แก้ไขล่าสุด)</span>}
                      </Typography>
                    </Box>
                    {isEditing === commentS?.commentId ? (
                      <>
                        <TextField
                          fullWidth
                          value={editComment}
                          onChange={(e) => setEditComment(e.target.value)} />
                        <Button sx={{ mt: 1 }}
                          onClick={() => handleUpdateComment(commentS?.commentId)}
                          disabled={!editComment.trim() || commentS?.commentText === editComment}
                        >
                          บันทึก
                        </Button>
                        <Button sx={{ mt: 1 }}
                          onClick={() => {
                            setIsEditing(null);
                            setEditComment('');
                          }}
                        >
                          ยกเลิก
                        </Button>
                      </>
                    ) : (
                      <Typography>{commentS?.commentText}</Typography>
                    )}
                  </Box>

                  {isEditing === commentS?.commentId ? (
                    <></>
                  ) : (
                    String(userData?.userId) === String(commentS?.userId) && (
                      <Box sx={{ alignSelf: 'center', ml: 'auto' }}>
                        <IconButton onClick={() => {
                          setIsEditing(commentS?.commentId);
                          setEditComment(commentS?.commentText);
                        }}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteComment(commentS?.commentId)}><DeleteIcon /></IconButton>
                      </Box>
                    )
                  )}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box >
  );
}

export default TravelPage;
