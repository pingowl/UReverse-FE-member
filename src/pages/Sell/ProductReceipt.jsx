import { useNavigate } from 'react-router-dom';
import styles from './ProductReceipt.module.css';
import { useRecoilState } from 'recoil';
import { sellFormState } from '../../atoms/sellFormState';
import { useEffect, useState } from 'react';
import HoverEventButton from '../../component/button/HoverEventButton';
import SellCompleteModal from '../../component/sellNotice/SellCompleteModal';
import { formatNumberWithComma } from '../../util/FormatNumberWithComma';
import { uploadProduct } from '../../api/product';
import api from '../../api/axiosInstance';

export default function ProductReceipt(){
    const navigate = useNavigate();
    const [formData, setFormData] = useRecoilState(sellFormState);

    const [agree1, setAgree1] = useState(false);
    const [agree2, setAgree2] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleFianlNoticeSelection = async () => {
        setIsModalOpen(false);
        try {
            await postProductHandler(formData); // 업로드 완료
            navigate('/sell/complete');        // 성공 시 이동
        } catch (err) {
            alert("상품 등록 실패");
        }
    };

    useEffect(() => {
        const brand = formData?.product?.brand;
        const category = formData?.product?.category;
        const images = formData?.product?.images;
        const address = formData?.address;

        const isBrandEmpty = !brand || Object.keys(brand).length === 0;
        const isCategoryEmpty = !category || Object.keys(category).length === 0;
        const isImageCountInvalid = !images || images.length < 2;

        const isAddressInvalid =
            !address?.name ||
            !address?.phone ||
            !address?.address ||
            !address?.addressDetail ||
            !address?.zipCode;

        if (isBrandEmpty || isCategoryEmpty || isImageCountInvalid || isAddressInvalid) {
        navigate('/sell/product');
        }
    }, [formData, navigate])

    const postProductHandler = async() => {
        try{
            // S3 이미지 업로드
            const uploadedUrls = [];

            for (const image of formData.product.images) {
                const file = image.file;
                const { name: fileName, type: contentType } = file;
                
                // 1-1. presigned URL 요청
                const presignRes = await api.get('/api/v1/s3/presigned-url', {
                    params: { fileName, contentType },
                });
                const { presignedUrl, accessUrl } = presignRes.data;

                // 1-2. S3 업로드 (Authorization 제거 필요)
                await fetch(presignedUrl, {
                    method: "PUT",
                    headers: { 'Content-Type': contentType },
                    body: file,
                });
                uploadedUrls.push(accessUrl);
            }

            // 2. formData에 imageUrls 포함
            const productData = {
                name: formData.address.name,
                phone: formData.address.phone,
                address: formData.address.address,
                addressDetail: formData.address.addressDetail,
                zipCode: formData.address.zipCode,
                brandId: String(formData.product.brand.brandId),
                brandName: formData.product.brand.name,
                categoryId: String(formData.product.category.categoryId),
                category: `${formData.product.category.mainCategoryName} / ${formData.product.category.subCategoryName}`,
                productsImageUrl: uploadedUrls
            };

            // 3. 상품 정보 저장 요청
            await uploadProduct(productData);

        } catch (err) {
            if (err.response) {
                console.error("응답 상태:", err.response.status);
                console.error("서버 메시지:", err.response.data);
            } else if (err.request) {
                console.error("요청은 전송됐지만 응답 없음", err.request);
            } else {
                console.error("Axios 구성 에러", err.message);
            }
        }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.content}>
        <div className={styles.innerContent}>
          <div className={styles.processBar}>
            <div className={styles.doneProcessBar}></div>
            <div className={styles.doneProcessBar}></div>
            <div className={styles.doneProcessBar}></div>
          </div>

          <div className={styles.stepDescription}>
            <p>
              마지막 단계
              <br />
              입력한 정보를 최종 확인 후,
              <br />
              판매 신청해 주세요!
            </p>
          </div>

          <div className={styles.receiptArea}>
            <div className={styles.section}>
              <div className={styles.sectionTitle}>판매자 정보</div>
              <div className={styles.infoItem}>
                <div className={styles.infoItemTitle}>이름</div>
                <div className={styles.infoItemContent}>
                  {formData.address?.name}
                </div>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.infoItemTitle}>휴대폰번호</div>
                <div className={styles.infoItemContent}>
                  {formData.address?.phone}
                </div>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.infoItemTitle}>수거지 주소</div>
                <div className={styles.infoItemContent}>
                  ({formData.address?.zipCode}) {formData.address?.address}{' '}
                  {formData.address?.addressDetail}
                </div>
              </div>
            </div>

            <div className={styles.section}>
              <div className={styles.sectionTitle}>판매 상품 정보</div>
              <div className={styles.brandInfo}>
                <div className={styles.brandKo}>
                  {formData.product?.brand?.name}
                </div>
                <div className={styles.brandEn}>
                  {formData.product?.brand?.nameEn}
                </div>
              </div>
              <div className={styles.infoItemContent}>
                {formData.product.category?.mainCategoryName} |{' '}
                {formData.product.category?.subCategoryName}
              </div>
              <div className={styles.pointBox}>
                <div>지급 예상 H.Point</div>
                <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                  {formatNumberWithComma(formData.product.category.point)}P
                </div>
              </div>
            </div>

            <div className={styles.section}>
              <div className={styles.sectionTitle}>서비스 이용 동의</div>
              <div className={styles.subTitle}>
                아래 주의사항을 확인 후, 동의 바랍니다.
              </div>

              <div className={styles.checkboxItem}>
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  id="agree1"
                  checked={agree1}
                  onChange={() => setAgree1(!agree1)}
                />
                <div>
                  <label htmlFor="agree1">
                    (필수) 개인정보 수집/이용 및 제3자 제공 약관 동의
                  </label>
                  <div
                    className={styles.viewMore}
                    onClick={() =>
                      window.open(
                        'https://mmemory.notion.site/3-1d531790a13680d493b3f32f6f66b539'
                      )
                    }
                  >
                    자세히 보기
                  </div>
                </div>
              </div>

              <div className={styles.checkboxItem}>
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  id="agree2"
                  checked={agree2}
                  onChange={() => setAgree2(!agree2)}
                />
                <label htmlFor="agree2">
                  (필수) 상품 수거 이후에는 판매 철회가 불가능하며, 검수 결과에
                  따라 실패된 상품만 반송될 수 있음에 동의합니다.
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.fixedButtonWrapper}>
        <div className={styles.buttonGroup}>
          <HoverEventButton
            text="판매신청완료"
            width="w-full"
            height="h-12"
            color="green"
            onClick={() => setIsModalOpen(true)}
            disabled={!(agree1 && agree2)}
          />
        </div>
      </div>

      {isModalOpen && (
        <SellCompleteModal
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleFianlNoticeSelection}
        />
      )}
    </div>
  );
}
