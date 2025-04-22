import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function History() {

    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, []);

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const getAllTripsByUserId = async () => {

            if (!userData?.userId) return;

            try {
                const response = await axios.get(`https://n8n-bb7z.onrender.com/webhook/c502a429-0ea4-4c9f-a86d-5bc928db036d/at/trip/history/${userData.userId}`);
                console.log(response.data.body);
                if (!response.data.body?.length || !Object.keys(response.data.body[0]).length) return;
                setTrip(response.data.body);
            } catch (error) {
                console.error(error);
            }
        };
        getAllTripsByUserId();
    }, [userData]);

    const handleDeleteTrip = async (tripId) => {
        try {
            await axios.post(`https://n8n-bb7z.onrender.com/webhook/c502a429-0ea4-4c9f-a86d-5bc928db036d/at/trip/history/${tripId}`,);
            alert('ลบสำเร็จ')
            // อัปเดต state trip ทันที หลังจากลบสำเร็จ
            setTrip(prevTrips => prevTrips.filter(trip => trip.tripId !== tripId));

        } catch (error) {
            console.error(error);
        }
    };

    const [trip, setTrip] = useState([]);
    const navigate = useNavigate();

    const formatDate = (dateString) => {
        const monthsThai = [
            'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
            'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
        ];

        if (!dateString) return '';
        const [year, month, day] = dateString.split('-');
        return `${parseInt(day)} ${monthsThai[parseInt(month) - 1]} ${year}`;
    };

    return (
        <div style={{ backgroundColor: '#f4f4f9', fontFamily: 'Arial, sans-serif', padding: '40px 20px' }}>
            {/* Header Section */}
            <div style={{ backgroundColor: '#f57c00', padding: '20px 0', color: 'white' }}>
                <h2 style={{ textAlign: 'center', margin: 0, fontSize: '32px', fontWeight: '600' }}>
                    📜ประวัติการเดินทาง
                </h2>
            </div>

            {/* Content Section */}
            <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '30px', backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 6px 25px rgba(0, 0, 0, 0.1)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f57c00', color: 'white' }}>
                            <th style={{ padding: '15px', textAlign: 'center', fontSize: '16px' }}>สถานที่</th>
                            <th style={{ padding: '15px', textAlign: 'center', fontSize: '16px' }}>จังหวัด</th>
                            <th style={{ padding: '15px', textAlign: 'center', fontSize: '16px' }}>ค่าใช้จ่าย(บาท)</th>
                            <th style={{ padding: '15px', textAlign: 'center', fontSize: '16px' }}>วันที่อัพโหลด</th>
                            <th style={{ padding: '15px', textAlign: 'center', fontSize: '16px', fontSize: '32px' }}>✏️</th>
                            <th style={{ padding: '15px', textAlign: 'center', fontSize: '16px', fontSize: '32px' }}>❌</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trip.map((trip, index) => (
                            <tr key={trip.tripId} style={{ backgroundColor: index % 2 === 0 ? '#fafafa' : '#f4f4f9' }}>
                                <td style={{ padding: '12px', textAlign: 'center', fontSize: '16px', fontWeight: 'bold' }}>{trip.tripPlace}</td>
                                <td style={{ padding: '12px', textAlign: 'center', fontSize: '16px' }}>{trip.tripProvince}</td>
                                <td style={{ padding: '12px', textAlign: 'center', fontSize: '16px' }}>{trip.tripCost}.-</td>
                                <td style={{ padding: '12px', textAlign: 'center', fontSize: '16px' }}>{formatDate(trip.createdAt)}</td>
                                <td style={{ padding: '12px', textAlign: 'center' }}>
                                    <button
                                        style={{
                                            backgroundColor: '#f57c00',
                                            color: 'white',
                                            border: 'none',
                                            padding: '8px 16px',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            margin: '5px',
                                            fontSize: '16px',
                                            transition: 'background-color 0.3s ease',
                                        }}
                                        onMouseEnter={(e) => e.target.style.backgroundColor = '#d76a00'}
                                        onMouseLeave={(e) => e.target.style.backgroundColor = '#f57c00'}
                                        onClick={() => navigate(`/edit-travel/${trip.tripId}`)}
                                    >
                                        แก้ไข
                                    </button>
                                </td>
                                <td style={{ padding: '12px', textAlign: 'center' }}>
                                    <button
                                        style={{
                                            backgroundColor: '#e53935',
                                            color: 'white',
                                            border: 'none',
                                            padding: '8px 16px',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            margin: '5px',
                                            fontSize: '16px',
                                            transition: 'background-color 0.3s ease',
                                        }}
                                        onMouseEnter={(e) => e.target.style.backgroundColor = '#c62828'}
                                        onMouseLeave={(e) => e.target.style.backgroundColor = '#e53935'}
                                        onClick={() => handleDeleteTrip(trip.tripId)}
                                    >
                                        ลบ
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Button Add Travel */}
                <div style={{ textAlign: 'center' }}>
                    <Link to="/add-travel" style={{ textDecoration: 'none' }}>
                        <button
                            style={{
                                backgroundColor: '#f57c00',
                                color: 'white',
                                padding: '14px 28px',
                                fontSize: '18px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                border: 'none',
                                boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
                                transition: 'background-color 0.3s ease',
                                marginTop: '30px',
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#d76a00'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = '#f57c00'}
                        >
                            เพิ่มการเดินทาง
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default History;
