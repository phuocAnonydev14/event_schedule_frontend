import { Carousel } from "react-responsive-carousel"
import capture from "../../../assets/images/Capture.png"
import "./Evaluate.css"
import { FaStar } from "react-icons/fa";
function Evaluate() {
    return (
        <div className="">
            <p className=" uppercase font-bold text-blue-500 text-3xl text-center mt-16 mb-10">Đánh giá khách hàng</p>
            <div>
                <Carousel showThumbs={false} autoPlay={true} className="shadow-2xl mb-10">
                    <div className="h-[350px] ">
                        <img className=" mt-12" src={capture} style={{ width: '100px' }} />
                        <div className="flex justify-center ">
                            <FaStar className="icon_star" />
                            <FaStar className="icon_star" />
                            <FaStar className="icon_star" />
                            <FaStar className="icon_star" />
                            <FaStar className="icon_star" />
                        </div>
                        <p className=" font-bold text-center text-xl mt-2">Anh Minh Quý</p>
                        <p className=" italic mt-2">Hà Nội Event Công ty tổ chức sự kiện cho thuê các thiết bị âm thanh , ánh sáng</p>
                        <p className=" italic">hàng đầu tại khu vực Hà Nội</p>
                    </div>
                    <div>
                        <img className=" mt-12" src={capture} style={{ width: '100px' }} />
                        <div className="flex justify-center ">
                            <FaStar className="icon_star" />
                            <FaStar className="icon_star" />
                            <FaStar className="icon_star" />
                            <FaStar className="icon_star" />
                        </div>
                        <p className=" font-bold text-center text-xl mt-2">Anh Quý Dương</p>
                        <p className=" italic mt-2">Hà Nội Event Công ty tổ chức sự kiện cho thuê các thiết bị âm thanh , ánh sáng</p>
                        <p className=" italic">uy tín nhanh chóng hiệu quả</p>
                    </div>
                    <div>
                        <img className=" mt-12" src={capture} style={{ width: '100px' }} />
                        <div className="flex justify-center ">
                            <FaStar className="icon_star" />
                            <FaStar className="icon_star" />
                            <FaStar className="icon_star" />
                            <FaStar className="icon_star" />
                        </div>
                        <p className=" font-bold text-center text-xl mt-2">Anh Quý Dương</p>
                        <p className=" italic mt-2">Hà Nội Event Công ty tổ chức sự kiện cho thuê các thiết bị âm thanh , ánh sáng</p>
                        <p className=" italic">uy tín nhanh chóng hiệu quả</p>
                    </div>
                    <div>
                        <img className=" mt-12" src={capture} style={{ width: '100px' }} />
                        <div className="flex justify-center ">
                            <FaStar className="icon_star" />
                            <FaStar className="icon_star" />
                            <FaStar className="icon_star" />
                            <FaStar className="icon_star" />
                        </div>
                        <p className=" font-bold text-center text-xl mt-2">Anh Quý Dương</p>
                        <p className=" italic mt-2">Hà Nội Event Công ty tổ chức sự kiện cho thuê các thiết bị âm thanh , ánh sáng</p>
                        <p className=" italic">uy tín nhanh chóng hiệu quả</p>
                    </div>
                    <div>
                        <img className=" mt-12" src={capture} style={{ width: '100px' }} />
                        <div className="flex justify-center ">
                            <FaStar className="icon_star" />
                            <FaStar className="icon_star" />
                            <FaStar className="icon_star" />
                            <FaStar className="icon_star" />
                        </div>
                        <p className=" font-bold text-center text-xl mt-2">Anh Quý Dương</p>
                        <p className=" italic mt-2">Hà Nội Event Công ty tổ chức sự kiện cho thuê các thiết bị âm thanh , ánh sáng</p>
                        <p className=" italic">uy tín nhanh chóng hiệu quả</p>
                    </div>
                </Carousel>
            </div>
        </div>
    )
}

export default Evaluate
