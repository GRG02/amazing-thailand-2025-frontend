import React from 'react';
import { Box, TextField, Typography, Link, Paper, Stack, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';

function Register() {
    const validationSchema = Yup.object({
        userName: Yup.string()
            .matches(/^[a-zA-Z0-9]*$/, 'ชื่อผู้ใช้สามารถพิมพ์ได้แค่พยัญชนะภาษาอังกฤษและตัวเลขเท่านั้น')
            .required('กรุณาใส่ชื่อผู้ใช้...'),
        userEmail: Yup.string()
            .email('อีเมลไม่ถูกต้อง')
            .matches(/^[^'";]*$/, 'อีเมลมีอัครพิเศษที่ไม่ได้รับอนุญาต')
            .required('กรุณาใส่อีเมล...'),
        userPassword: Yup.string()
            .min(6, 'รหัสผ่านต้องมีอย่างน้อย 6 ตัว')
            .matches(/^[a-zA-Z0-9^'";]*$/, 'รหัสผ่านมีอัครพิเศษที่ไม่ได้รับอนุญาต')
            .required('กรุณาใส่รหัสผ่าน...'),
        userPasswordConfirm: Yup.string()
            .oneOf([Yup.ref('userPassword'), null], 'รหัสผ่านไม่ตรงกัน')
            .required('กรุณายืนยันรหัสผ่าน...'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const navigate = useNavigate();

    // ฟังก์ชันที่ใช้ตอน submit ฟอร์ม
    const onSubmit = async (data) => {
        console.log(data); // ดูข้อมูลที่ submit
        try {
            const response = await axios.post('https://n8n-bb7z.onrender.com/webhook/at/user/', data);
            alert('สร้างบัญชีใหม่สําเร็จ');
            // console.log('ส่งข้อมูลสำเร็จ:', response.data);
            navigate('/login');
        } catch (error) {
            alert('เกิดข้อผิดพลาดในการส่งข้อมูล');
            // console.error('เกิดข้อผิดพลาดในการส่งข้อมูล:', error);
        }
    };

    return (
        <Box
            sx={{
                backgroundColor: "#E98410",
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Box sx={{
                backgroundColor: "#E98410",
                width: "100%",
                maxWidth: 1500,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <Paper elevation={4} sx={{ padding: 4, borderRadius: 4, height: 'auto', width: 750, textAlign: "center", }}>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        สร้างบัญชีใหม่
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack spacing={2}>
                            <TextField
                                variant="filled"
                                label="ชื่อผู้ใช้..."
                                fullWidth
                                {...register('userName')} // ผูกกับ react-hook-form
                                error={!!errors.userName} // แสดง error ถ้ามี
                                helperText={errors.userName?.message} // ข้อความ error
                            />
                            <TextField
                                variant="filled"
                                label="อีเมล..."
                                fullWidth
                                {...register('userEmail')}
                                error={!!errors.userEmail}
                                helperText={errors.userEmail?.message}
                            />
                            <TextField
                                variant="filled"
                                label="รหัสผ่าน..."
                                type="password"
                                fullWidth
                                {...register('userPassword')}
                                error={!!errors.userPassword}
                                helperText={errors.userPassword?.message}
                            />
                            <TextField
                                variant="filled"
                                label="ยืนยันรหัสผ่าน..."
                                type="password"
                                fullWidth
                                {...register('userPasswordConfirm')}
                                error={!!errors.userPasswordConfirm}
                                helperText={errors.userPasswordConfirm?.message}
                            />
                            <Button variant="contained" fullWidth sx={{ mt: 4, py: 2, backgroundColor: "#0080FF" }} type="submit">
                                สร้างบัญชีผู้ใช้
                            </Button>
                        </Stack>
                    </form>

                    <Typography variant="body2" mt={3}>
                        มีบัญชีแล้ว?{" "}
                        <Link href="/login" underline="none" fontWeight="bold" color="primary">
                            เข้าสู่ระบบ
                        </Link>
                    </Typography>
                </Paper>
            </Box>
        </Box>
    );
}

export default Register;
