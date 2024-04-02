import "./Consultant.css"
import { FaPhoneAlt, FaFacebookF } from "react-icons/fa";
function Consultant() {
    return (
        <div className=" mt-20 flex  consultant h-[500px] ">
            <div className="flex items-center justify-center flex-col ml-80">
                <h1 className=" uppercase font-bold text-white text-3xl">Tư vấn khách hàng</h1>
                <p className="ml-10 text-white mt-6">HANOI Event sẽ gọi điện thoại tư vấn trực tiếp cho quý khách khi để lại thông tin :</p>
                <div className="flex mt-5">
                    <div className="flex mr-7 rounded-full p-3 bg-blue-400 ">
                        <span className="text-white items-center flex mr-3"><FaPhoneAlt /></span>
                        <p className="text-white mr-4"> 0898.240.032</p>
                    </div>
                    <div className="flex mr-2 rounded-full p-3 bg-blue-300">
                        <span className="text-white items-center flex mr-3"><FaFacebookF /></span>
                        <p className=" uppercase text-white mr-4">Chat zalo</p>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Consultant
