import { useEffect, useState } from 'react';
import styles from './UserAddressForm.module.css';
import { useRecoilState } from 'recoil';
import { sellFormState } from '../../atoms/sellFormState';
import { useNavigate } from 'react-router-dom';

export default function UserAddressForm(){
    const navigate = useNavigate();
    const [formData, setFormData] = useRecoilState(sellFormState);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [addressDetail, setAddressDetail] = useState('');
    const [zipCode, setZipCode] = useState('');

    useEffect(() => {
        console.log(formData);
    }, [])

    const updateAddressInfo = () => {
        setFormData(prev => ({
          ...prev,
          address: {
            name,
            phone,
            address,
            addressDetail,
            zipCode,
          }
        }));
        navigate('/sell/receipt');
      };

    return (
        <div>판매창</div>
    )
}