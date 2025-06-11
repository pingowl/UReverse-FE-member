import { useState } from "react";
import SellPreviewModal from "../../component/sellPreview/SellPreviewModal";

export default function Sell(){
    const [isModalOpen, setIsModalOpen] = useState(true);

    return (
        <div>
            판매 페이지입니다.
            {isModalOpen && <SellPreviewModal onClose={() => setIsModalOpen(false)} />}
        </div>
    )
}