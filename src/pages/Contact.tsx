import { FaPhoneAlt, FaFacebookF } from "react-icons/fa";
import "./Contact.css"
const Contact = () => {
    return (
        <>
            <div className="contact">
                <div className=" shadow-lg">
                    <p className="ml-5 desc uppercase text-3xl text-white font-bold mt-5">Liên hệ chúng tôi</p>
                    <div className="contact_for_me">
                        <p className=" ml-5 text-white"> Quý khách hàng có Yêu cầu gửi Báo giá hoặc cần hỗ trợ tư vấn các dịch vụ Tổ chức Sự Kiện, Du Lịch công ty, xin vui lòng liên hệ với chúng tôi qua những kênh liên lạc dưới đây hoặc gọi trực tiếp vào Hotline,
                            chúng tôi luôn sẵn sàng trực tiếp hỗ trợ quý khách 24/7.
                        </p>
                    </div>
                </div>
                <div className="flex mt-5 absolute top-80 ml-6">
                    <div className="flex mr-7 rounded-full p-3 bg-blue-400 ">
                        <span className="text-white items-center flex mr-3"><FaPhoneAlt /></span>
                        <p className="text-white mr-4"> 0898.240.032</p>
                    </div>
                    <div className="flex mr-2 rounded-full p-3 bg-blue-700 ">
                        <span className="text-white items-center flex mr-3"><FaFacebookF /></span>
                        <p className=" uppercase text-white mr-4">Chat zalo</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact
