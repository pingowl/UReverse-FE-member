import { useEffect, useState } from 'react';
import styles from './UserAddressForm.module.css';
import { useRecoilState } from 'recoil';
import { sellFormState } from '../../atoms/sellFormState';
import { useNavigate } from 'react-router-dom';
import HoverEventButton from '../../component/button/HoverEventButton';
import UserInput from '../../component/sell/address/UserInput';

export default function UserAddressForm(){
    const navigate = useNavigate();
    const [formData, setFormData] = useRecoilState(sellFormState);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [addressDetail, setAddressDetail] = useState('');
    const [zipCode, setZipCode] = useState('');

    // 다음 버튼 클릭시 atom 에 저장장
    const handleClickNextBtn = () => {
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
        //   navigate('/sell/address');
    }

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
        <div className={styles.pageWrapper}>
            <div className={styles.content}>
                <div className={styles.innerContent}>

                    <div className={styles.processBar}>
                        <div className={styles.doneProcessBar}></div>
                        <div className={styles.doneProcessBar}></div>
                        <div className={styles.noneProcessBar}></div>
                    </div>

                    <div className={styles.stepDescription}>
                        <p>
                            Step.2<br/>
                            택배 기사님이 방문할<br/>
                            고객님의 주소를 입력해 주세요!
                        </p>
                    </div>

                    <div className={styles.inputArea}>
                        <UserInput
                            name={name}
                            setName={setName}
                            number={phone}
                            setNumber={setPhone}
                            zipCode={zipCode}
                            setZipcode={setZipCode}
                            address={address}
                            setAddress={setAddress}
                            addressDetail={addressDetail}
                            setAddressDetail={setAddressDetail}
                        />
                    </div>
                </div>
            </div>

            <div className={styles.fixedButtonWrapper}>
                <div className={styles.buttonGroup}>
                <HoverEventButton
                        text="다음"
                        width="w-full"
                        height="h-12"
                        color="green"
                        onClick={handleClickNextBtn}
                        disabled={
                            !name || !phone || !address || !addressDetail || !zipCode
                        }
                    />
                </div>
            </div>
        </div>
    )
}