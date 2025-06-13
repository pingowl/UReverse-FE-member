import { atom } from "recoil";

/**
 * 사용자가 판매 데이터 입력 시
 * 브랜드, 카테고리, 이미지 / 주소, 사용자정보 입력을 저장해 둘 전역 변수
 */
export const sellFormState = atom({
  key: 'sellFormState',
  default: {
    product: {
      brand: '',
      category: [],
      images: [], // preview + file
    },
    address: {
      name: '',
      phone: '',
      address: '',
      addressDetail: '',
      zipCode: '',
    }
  }
});
