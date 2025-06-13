import { useEffect, useRef, useState } from 'react';
import HoverEventButton from '../../button/HoverEventButton';
import CommonInput from '../../input/CommonInput';
import styles from './UserInput.module.css';

export default function UserInput({
    name, setName, 
    number, setNumber, 
    zipCode, setZipcode, 
    address, setAddress, 
    addressDetail, setAddressDetail}){

    const [isPostOpen, setIsPostOpen] = useState(false);
    const postRef = useRef(null);
    
    const handleOpenPost = () => setIsPostOpen(true);
    
    useEffect(() => {
        if (!isPostOpen || !postRef.current) return;
    
        const post = new window.daum.Postcode({
            oncomplete: function (data) {
                setZipcode(data.zonecode);
                setAddress(data.address);
                setIsPostOpen(false);
            },
            onresize: function (size) {
                if (postRef.current) {
                    postRef.current.style.height = `${size.height}px`;

                    const iframe = postRef.current.querySelector('iframe');
                    if (iframe) {
                        iframe.style.height = `${size.height}px`;
                    }
                }
            },
            width: '100%',
            height: '100%'
        });
    
        post.embed(postRef.current);
        //postLayer로 부드럽게 스크롤 이동
        postRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, [isPostOpen]);
    
    return (
        <div className={styles.formWrapper}>
            {/* 사용자 기본 정보 */}
            <div className={styles.userInfoInputArea}>
                <label className={styles.label}>이름</label>
                <CommonInput
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="이름을 입력하세요"
                />

                <label className={styles.label}>휴대폰번호</label>
                <CommonInput
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    placeholder="숫자만 입력"
                />
            </div>

            {/* 주소 입력 */}
            <div className={styles.addressInputArea}>
                <label className={styles.label}>수거지 주소</label>

                {/* 클릭 시 카카오 주소검색 레이어 영역 할당당 */}
                <div className={styles.addressZipRow}>
                    <div onClick={handleOpenPost}>
                    <CommonInput
                        value={zipCode}
                        readOnly
                        placeholder="우편번호"
                    />
                    </div>
                    <HoverEventButton 
                        text="주소 검색"
                        width="w-full"
                        height="40px"
                        color="black"
                        onClick={handleOpenPost}
                    />
                </div>

                {/* 레이어: 카카오 주소검색 결과 */}
                {isPostOpen && (
                <div className={styles.postLayer}>
                    <div ref={postRef} style={{ width: '100%', height: '100%' }} />
                </div>
                )}

                <div onClick={handleOpenPost}>
                <CommonInput
                    value={address}
                    readOnly
                    placeholder="주소"
                />
                </div>

                <CommonInput
                    value={addressDetail}
                    onChange={(e) => setAddressDetail(e.target.value)}
                    placeholder="상세 주소 (예: 101동 1001호)"
                />
            </div>
        </div>
    )
}