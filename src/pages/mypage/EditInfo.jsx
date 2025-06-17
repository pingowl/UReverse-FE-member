import React, { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { userState } from '../../atoms/userState';
import CommonInput from '../../component/input/CommonInput';
import HoverEventButton from '../../component/button/HoverEventButton';
import ConfirmModal from '../../component/modal/MessageModal';
import styles from './EditInfo.module.css';
import {
    updateMemberInfo,
    logout,
    deleteMember,
    getMyInfo,
    changePassword
} from '../../api/member';

export default function EditInfo() {
    const user = useRecoilValue(userState);
    const setUser = useSetRecoilState(userState);
    const navigate = useNavigate();

    const [email, setEmail] = useState(user.email || '');
    const [name, setName] = useState(user.name || '');
    const [phone, setPhone] = useState(user.phone || '');
    const [password, setPassword] = useState('');
    const [emailChanged, setEmailChanged] = useState(false);
    const [showPasswordCheck, setShowPasswordCheck] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const [showChangePwForm, setShowChangePwForm] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordCheck, setNewPasswordCheck] = useState('');

    useEffect(() => {
        setEmailChanged(email !== user.email);
    }, [email, user.email]);

    const handleUpdate = async () => {
        try {
            if (emailChanged && !password) {
                setModalMessage('이메일을 변경하려면 비밀번호를 입력하세요.');
                setShowErrorModal(true);
                return;
            }

            const payload = {
                email,
                name,
                phone,
                ...(emailChanged && { password }),
            };

            await updateMemberInfo(payload);

            const res = await getMyInfo();
            const {
                userId,
                email: updatedEmail,
                name: updatedName,
                phone: updatedPhone,
                role,
                productStatus,
            } = res;

            setUser({
                userId,
                email: updatedEmail,
                name: updatedName,
                phone: updatedPhone,
                role,
                isLoggedIn: true,
                productStatus,
            });

            setModalMessage('회원 정보가 수정되었습니다.');
            setShowSuccessModal(true);
        } catch (err) {
            setModalMessage('회원 정보 수정에 실패했습니다.');
            setShowErrorModal(true);
            console.error(err);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            localStorage.removeItem('accessToken');
            navigate('/login');
        } catch (err) {
            setModalMessage('로그아웃 실패');
            setShowErrorModal(true);
        }
    };

    const handleDelete = () => {
        setConfirmPassword('');
        setShowModal(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteMember(confirmPassword);
            localStorage.removeItem('accessToken');
            setShowModal(false);
            navigate('/signup');
        } catch (err) {
            setShowModal(false);
            setModalMessage('비밀번호가 올바르지 않거나 권한이 없습니다.');
            setShowErrorModal(true);
        }
    };

    const handleChangePassword = async () => {
        if (newPassword !== newPasswordCheck) {
            setModalMessage('새 비밀번호가 일치하지 않습니다.');
            setShowErrorModal(true);
            return;
        }

        try {
            await changePassword({ currentPassword, newPassword });
            setModalMessage('비밀번호가 변경되었습니다.');
            setShowSuccessModal(true);
            setShowChangePwForm(false);
            setCurrentPassword('');
            setNewPassword('');
            setNewPasswordCheck('');
        } catch (err) {
            setModalMessage(
                err.response?.data?.errorMessage || '비밀번호 변경에 실패했습니다.'
            );
            setShowErrorModal(true);
        }
    };


    return (
        <div className={styles.wrapper}>
            <h2 className={styles.pageTitle}>마이페이지</h2>

            <div className={styles.infoBox}>
                <h3 className={styles.infoTitle}>내 정보</h3>

                <div className={styles.inputGroup}>
                    <CommonInput
                        label="아이디(이메일)"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setEmailChanged(e.target.value !== user.email);
                        }}
                    />

                    {emailChanged && !showPasswordCheck && (
                        <HoverEventButton
                            text="비밀번호 확인하기"
                            onClick={() => setShowPasswordCheck(true)}
                            color="black"
                        />
                    )}

                    {emailChanged && showPasswordCheck && (
                        <CommonInput
                            label="비밀번호 확인"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    )}

                    <CommonInput
                        label="이름"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <CommonInput
                        label="전화번호"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>

                <div className={styles.updateButton}>
                    <HoverEventButton text="수정" onClick={handleUpdate} color="black" />
                </div>
            </div>

            <div className={styles.actionButtons}>
                <HoverEventButton
                    text="로그아웃"
                    onClick={handleLogout}
                    color="#B7F56F"
                />

                {!showChangePwForm && (
                    <HoverEventButton
                        text="비밀번호 변경하기"
                        onClick={() => setShowChangePwForm(true)}
                        color="#eeeeee"
                    />
                )}

                {showChangePwForm && (
                    <div className={styles.inputGroup}>
                        <CommonInput
                            label="현재 비밀번호"
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            placeholder="현재 비밀번호를 입력하세요"
                        />
                        <CommonInput
                            label="새 비밀번호"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="새 비밀번호를 입력하세요"
                        />
                        <CommonInput
                            label="새 비밀번호 확인"
                            type="password"
                            value={newPasswordCheck}
                            onChange={(e) => setNewPasswordCheck(e.target.value)}
                            placeholder="새 비밀번호를 다시 입력하세요"
                        />
                        <HoverEventButton
                            text="비밀번호 변경 완료"
                            onClick={handleChangePassword}
                            color="black"
                        />
                    </div>
                )}

                <HoverEventButton
                    text="회원탈퇴"
                    onClick={handleDelete}
                    color="#eeeeee"
                />
            </div>

            {/* 탈퇴 확인 모달 */}
            <ConfirmModal
                visible={showModal}
                message={"정말 탈퇴하시겠습니까?"}
                onClose={() => setShowModal(false)}
                onConfirm={handleConfirmDelete}
                password={confirmPassword}
                setPassword={setConfirmPassword}
                showPasswordInput={true}
            />

            {/* 실패 알림 모달 */}
            <ConfirmModal
                visible={showErrorModal}
                onClose={() => setShowErrorModal(false)}
                onConfirm={() => setShowErrorModal(false)}
                password=""
                setPassword={() => { }}
                isErrorOnly={true}
                message={modalMessage}
            />

            {/* 성공 알림 모달 */}
            <ConfirmModal
                visible={showSuccessModal}
                onClose={() => {
                    setShowSuccessModal(false);
                    navigate('/mypage');
                }}
                onConfirm={() => {
                    setShowSuccessModal(false);
                    navigate('/mypage');
                }}
                password=""
                setPassword={() => { }}
                isErrorOnly={true}
                message={modalMessage}
            />
        </div>
    );
}
