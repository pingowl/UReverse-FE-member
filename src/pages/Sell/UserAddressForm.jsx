import { useEffect, useState } from 'react';
import styles from './UserAddressForm.module.css';
import { useRecoilState, useRecoilValue } from 'recoil';
import { sellFormState } from '../../atoms/sellFormState';
import { useNavigate } from 'react-router-dom';
import HoverEventButton from '../../component/button/HoverEventButton';
import UserInput from '../../component/sell/address/UserInput';
import { userState } from '../../atoms/userState';
import InfoModal from '../../component/modal/InfoModal';

export default function UserAddressForm(){
    const user = useRecoilValue(userState);
    const navigate = useNavigate();
    const [formData, setFormData] = useRecoilState(sellFormState);
    const [name, setName] = useState(user.name);
    const [phone, setPhone] = useState(user.phone);
    const [address, setAddress] = useState('');
    const [addressDetail, setAddressDetail] = useState('');
    const [zipCode, setZipCode] = useState('');

    const [showModal, setShowModal] = useState(false); // 모달 표시 여부

    // 이름과 번호 유효성 검사 함수
    const isValidName = (value) => /^[a-zA-Z가-힣]+$/.test(value);
    const isValidPhone = (value) => /^01[01]-(\d{3}|\d{4})-\d{4}$/.test(value);

    // 다음 버튼 클릭시 atom 에 저장
    const handleClickNextBtn = () => {
        if (!isValidName(name) || !isValidPhone(phone)) {
            setShowModal(true);
            return;
        }
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
    }

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
            {showModal && (
                <InfoModal
                    title="입력 오류"
                    message="이름 또는 휴대폰 번호 형식이 올바르지 않습니다."
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    )
}