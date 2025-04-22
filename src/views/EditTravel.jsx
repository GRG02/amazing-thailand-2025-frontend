import React, { useState, useEffect } from 'react'
import { Box, Typography, TextField, Button, Avatar, Autocomplete } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import TravelIcon from '@mui/icons-material/FlightTakeoff'
import { styled } from "@mui/material/styles";
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import { Watch } from '@mui/icons-material';

const provinces = ['กระบี่', 'กรุงเทพมหานคร', 'กาญจนบุรี', 'กาฬสินธุ์', 'กำแพงเพชร', 'ขอนแก่น', 'จันทบุรี', 'ฉะเชิงเทรา', 'ชลบุรี', 'ชัยนาท', 'ชัยภูมิ', 'ชุมพร', 'เชียงราย', 'เชียงใหม่', 'ตรัง', 'ตราด', 'ตาก', 'นครนายก',
    'นครปฐม', 'นครพนม', 'นครราชสีมา', 'นครศรีธรรมราช', 'นครสวรรค์', 'นนทบุรี', 'นราธิวาส', 'น่าน', 'บึงกาฬ', 'บุรีรัมย์', 'ปทุมธานี', 'ประจวบคีรีขันธ์', 'ปราจีนบุรี', 'ปัตตานี', 'พระนครศรีอยุธยา', 'พะเยา', 'พังงา', 'พัทลุง',
    'พิจิตร', 'พิษณุโลก', 'เพชรบุรี', 'เพชรบูรณ์', 'แพร่', 'ภูเก็ต', 'มหาสารคาม', 'มุกดาหาร', 'แม่ฮ่องสอน', 'ยโสธร', 'ยะลา', 'ร้อยเอ็ด', 'ระนอง', 'ระยอง', 'ราชบุรี', 'ลพบุรี', 'ลำปาง', 'ลำพูน', 'เลย', 'ศรีสะเกษ', 'สกลนคร',
    'สงขลา', 'สตูล', 'สมุทรปราการ', 'สมุทรสงคราม', 'สมุทรสาคร', 'สระแก้ว', 'สระบุรี', 'สิงห์บุรี', 'สุโขทัย', 'สุพรรณบุรี', 'สุราษฎร์ธานี', 'สุรินทร์', 'หนองคาย', 'หนองบัวลำภู', 'อ่างทอง', 'อำนาจเจริญ', 'อุดรธานี', 'อุตรดิตถ์',
    'อุทัยธานี', 'อุบลราชธานี']
const keywordsList = [
    'วิวสวย', 'ทะเล', 'ภูเขา', 'น้ำตก', 'ป่า', 'เกาะ', 'ดำน้ำ', 'ถ้ำ', 'แม่น้ำ', 'จุดชมวิว',
    'วัด', 'โบราณสถาน', 'พิพิธภัณฑ์', 'งานวัด', 'ประเพณี', 'ตลาดโบราณ', 'คาเฟ่', 'ร้านกาแฟ',
    'ของกินอร่อย', 'ช้อปปิ้ง', 'ถนนคนเดิน', 'แหล่งเที่ยวกลางคืน', 'ปีนเขา', 'ล่องแก่ง', 'แคมป์ปิ้ง',
    'ขับรถเที่ยว', 'นั่งเรือ', 'ปั่นจักรยาน', 'เดินป่า', 'ราคาถูก', 'คุ้มค่า', 'หรูหรา', 'ฟรีค่าเข้า',
    'ถ่ายรูปสวย', 'จุดเช็คอิน', 'มุมมหาชน', 'อุทยานแห่งชาติ', 'ทุ่งดอกไม้', 'ท่องเที่ยวเชิงนิเวศ',
    'สวนสาธารณะ', 'ศูนย์การค้า', 'แหล่งชุมชน', 'บ้านไม้', 'ร้านอาหาร', 'บาร์', 'ค็อฟฟี่ช็อป',
    'ทัวร์', 'วิถีชีวิตท้องถิ่น', 'เที่ยวตามฤดูกาล', 'ทะเลสาบ', 'ภูมิอากาศเย็นสบาย'
]

function EditTravel() {

    const [selectedImage, setSelectedImage] = useState(null)
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, []);

    const { tripId } = useParams();
    const [trip, setTrip] = useState(null);

    useEffect(() => {
        const getTripById = async () => {

            if (!userData?.userId) return;

            try {
                const response = await axios.get(`https://n8n-bb7z.onrender.com/webhook/c502a429-0ea4-4c9f-a86d-5bc928db036d/at/trip-page/${tripId}`,)
                console.log(response.data);
                setTrip(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        getTripById();
    }, [userData]);

    const validationSchema = Yup.object({
        tripPlace: Yup.string()
            .matches(/^[a-zA-Z0-9ก-๙\s]*$/, 'ข้อความมีอักขระพิเศษที่ไม่ได้รับอนุญาต')
            .required('กรุณากรอกข้อมูล...'),

        tripProvince: Yup.string()
            .required('กรุณากรอกข้อมูล...'),

        tripKeyword: Yup.array()
            .min(1, 'กรุณาเลือกอย่างน้อย 1 คีย์เวิร์ด')
            .required('กรุณากรอกข้อมูล...'),

        tripCost: Yup.number()
            .typeError('กรุณากรอกตัวเลข')
            .positive('กรุณากรอกตัวเลขที่มากกว่า 0')
            .integer('กรุณากรอกเฉพาะจำนวนเต็ม')
            .nullable(),

        tripStartDate: Yup.string()
            .required('กรุณากรอกข้อมูล...'),

        tripEndDate: Yup.string()
            .required('กรุณากรอกข้อมูล...'),

        tripDesc: Yup.string()
            .matches(
                /^[a-zA-Z0-9ก-๙\s.,!?(){}&:_\/\-\p{L}\p{N}\p{P}\p{Zs}\p{Emoji_Presentation}]*$/u,
                'ข้อความมีอักขระที่ไม่ได้รับอนุญาต'
            )
            .required('กรุณากรอกข้อมูล...'),
    });

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isDirty },
        reset,
    } = useForm({
        resolver: yupResolver(validationSchema, { abortEarly: false }),
        mode: 'all',
    });

    // เมื่อ trip มีข้อมูลแล้ว -> reset ฟอร์ม
    useEffect(() => {
        if (trip) {
            reset({
                tripPlace: trip.tripPlace || '',
                tripProvince: trip.tripProvince || '',
                tripKeyword: trip.body?.map(item => item.keywordName) || [],
                tripCost: trip.tripCost || '',
                tripStartDate: trip.tripStartDate || '',
                tripEndDate: trip.tripEndDate || '',
                tripDesc: trip.tripDesc || '',
              });
        }
    }, [trip, reset]);

    const navigate = useNavigate();

    const onSubmit = async (data) => {

        if(!isDirty && !selectedImage){
            alert('ยังไม่มีการแก้ไขข้อมูล');
            return;
        }

        console.log(data);

        // if (!selectedImage) {
        //     alert('กรุณาเลือกรูปภาพก่อน');
        //     return;
        // }

        const formData = new FormData();
        formData.append('tripPlace', data.tripPlace);
        formData.append('tripProvince', data.tripProvince);
        data.tripKeyword.forEach((keyword) => {
            formData.append('tripKeyword', keyword);
        });
        formData.append('tripCost', data.tripCost);
        formData.append('tripStartDate', data.tripStartDate);
        formData.append('tripEndDate', data.tripEndDate);
        formData.append('tripDesc', data.tripDesc);
        formData.append('userId', userData.userId);
        if(selectedImage){
            formData.append('tripImage', selectedImage);
            formData.append('oldImage', trip.tripImage);
        }else{
            formData.append('tripImage', trip.tripImage);
        }

        for (const [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        try {
            const response = await axios.post(`https://n8n-bb7z.onrender.com/webhook/c502a429-0ea4-4c9f-a86d-5bc928db036d/at/edit-trip/${tripId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('แก้ไขข้อมูลสําเร็จ');
            navigate('/history');
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการส่งข้อมูล:', error);
            alert('เกิดข้อผิดพลาดในการส่งข้อมูล');
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const allowedTypes = ['image/png', 'image/jpeg'];
            if (!allowedTypes.includes(file.type)) {
                alert('กรุณาเลือกรูปภาพเฉพาะไฟล์ .png หรือ .jpg เท่านั้น');
                return;
            }
            setSelectedImage(file);
        }
    };

    const SelectFileBt = styled("input")({
        clip: "rect(0 0 0 0)",
        clipPath: "inset(50%)",
        height: 1,
        overflow: "hidden",
        position: "absolute",
        bottom: 0,
        left: 0,
        whiteSpace: "nowrap",
        width: 1,
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ backgroundColor: '#FFF3E0', minHeight: '100vh', py: 6, backgroundImage: 'url("https://www.transparenttextures.com/patterns/diamond-upholstery.png")',     }}>
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
                    <Typography
                        variant="h4"
                        sx={{
                            textAlign: 'center',
                            fontWeight: 'bold',
                            mb: 5,
                            color: '#E98410',
                            textShadow: '1px 1px 1px rgba(0,0,0,0.1)',
                        }}
                    >
                        แก้ไขข้อมูลการเดินทาง
                    </Typography>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'space-between' }}>
                        <Box sx={{ flex: 1, minWidth: 300 }}>
                            <Avatar
                                variant="rounded"
                                src={
                                    selectedImage
                                        ? URL.createObjectURL(selectedImage)
                                        : (trip && trip.tripImage !== 'null')
                                            ? `https://yxkmuhpwtkslojxocvxo.supabase.co/storage/v1/object/public/atimage/trip/${trip.tripImage}`
                                            : 'https://cdn-icons-png.flaticon.com/512/847/847969.png'
                                }
                                sx={{
                                    width: '100%',
                                    height: 300,
                                    bgcolor: '#f0f0f0',
                                    borderRadius: 3,
                                    border: '2px dashed #E98410',
                                    mb: 2,
                                }}
                            />
                            <Button
                                type="button"
                                component="label"
                                fullWidth
                                sx={{
                                    fontWeight: 'bold',
                                    fontSize: '1rem',
                                    backgroundColor: '#E98410',
                                    color: 'white',
                                    borderRadius: 3,
                                    py: 1.5,
                                    '&:hover': {
                                        backgroundColor: '#d6760d',
                                    },
                                }}
                                startIcon={<CloudUploadIcon />}
                            >
                                เลือกรูปภาพ
                                <SelectFileBt type="file" hidden accept="image/png, image/jpeg" onChange={handleImageChange} />
                            </Button>
                        </Box>

                        <Box sx={{ flex: 2, minWidth: 300 }}>
                            <TextField
                                label="ชื่อสถานที่"
                                variant="outlined"
                                fullWidth
                                sx={{ mb: 2 }}
                                {...register('tripPlace')}
                                error={!!errors.tripPlace}
                                helperText={errors.tripPlace?.message}
                                InputLabelProps={{ shrink: true }}
                            />

                            <Controller
                                name="tripProvince"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Autocomplete
                                        {...field}
                                        options={provinces}
                                        value={provinces.find(option => option === field.value) || null} // <-- ตรงนี้สำคัญ!
                                        onChange={(event, newValue) => {
                                            field.onChange(newValue);
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="เลือกจังหวัด"
                                                error={!!fieldState.error}
                                                helperText={fieldState.error?.message}
                                            />
                                        )}
                                        sx={{ mb: 2 }}
                                    />
                                )}
                            />

                            <Controller
                                name="tripKeyword"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Autocomplete
                                        multiple
                                        options={keywordsList}
                                        value={keywordsList.filter(option => field.value?.includes(option)) || []} // <-- สำคัญ!!
                                        onChange={(event, newValue) => field.onChange(newValue)}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="เลือกคีย์เวิร์ด"
                                                error={!!fieldState.error}
                                                helperText={fieldState.error?.message}
                                            />
                                        )}
                                        sx={{ mb: 2 }}
                                    />
                                )}
                            />

                            <TextField
                                label="ค่าใช้จ่ายในการเดินทาง (บาท)"
                                variant="outlined"
                                fullWidth
                                sx={{ mb: 2 }}
                                {...register('tripCost')}
                                error={!!errors.tripCost}
                                helperText={errors.tripCost?.message}
                                InputLabelProps={{ shrink: true }}
                            />

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <TextField
                                    label="วันที่เริ่มต้นการเดินทาง"
                                    type="date"
                                    fullWidth
                                    {...register('tripStartDate')}
                                    error={!!errors.tripStartDate}
                                    helperText={errors.tripStartDate?.message}
                                    InputLabelProps={{ shrink: true }}
                                />
                                <TextField
                                    label="วันที่สิ้นสุดการเดินทาง"
                                    type="date"
                                    fullWidth
                                    {...register('tripEndDate')}
                                    error={!!errors.tripEndDate}
                                    helperText={errors.tripEndDate?.message}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Box>
                        </Box>
                    </Box>

                    <TextField
                        label="คำอธิบาย / รีวิว"
                        fullWidth
                        multiline
                        rows={5}
                        sx={{ mt: 4 }}
                        {...register('tripDesc')}
                        error={!!errors.tripDesc}
                        helperText={errors.tripDesc?.message}
                        InputLabelProps={{ shrink: true }}
                    />

                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                backgroundColor: '#E98410',
                                fontWeight: 'bold',
                                fontSize: '1.1rem',
                                px: 4,
                                py: 1.5,
                                borderRadius: 3,
                                '&:hover': {
                                    backgroundColor: '#d6760d',
                                },
                            }}
                            startIcon={<TravelIcon />}
                        >
                            บันทึกการเเก้ไข
                        </Button>
                    </Box>
                </Box>
            </Box>
        </form>
    );
}

export default EditTravel;
