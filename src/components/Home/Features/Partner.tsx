import icon from "../../../assets/images/icon.jpg"
import vnel from "../../../assets/images/vnel.png"
import anh2 from "../../../assets/images/2.png"
import anh3 from "../../../assets/images/3.png"
import anh4 from "../../../assets/images/4.png"
import anh5 from "../../../assets/images/5.png"
import anh6 from "../../../assets/images/6.png"
import anh7 from "../../../assets/images/7.png"
import anh8 from "../../../assets/images/8.png"
import "./Partner.css"

function Partner() {
    return (
        <div className=" mt-20 partner">
            <div className="flex">
                <img src={icon} alt="" />
                <p className=" uppercase text-blue-500 font-bold text-xl mt-2 ml-4">Đối tác khách hàng</p>
            </div>
           <div className="banner-wrapper">
           <div className="flex justify-between p-16 wrapper">
                <div className="images">
                    <div className="w-[233px] h-[140px] shadow-md rounded-lg">
                        <img src={anh6} alt="" />
                    </div>
                    <div className="w-[230px] shadow-md rounded-lg">
                        <img src={anh7} alt="" />
                    </div>
                    <div className="w-[230px] shadow-md rounded-lg">
                        <img src={anh4} className="h-[130px] w-[230px]" />
                    </div>
                    <div className="w-[204px] shadow-md rounded-lg">
                        <img src={vnel} alt="" />
                    </div>
                </div>
                <div className="images">
                    <div className="w-[233px] h-[140px] shadow-md rounded-lg">
                        <img src={anh6} alt="" />
                    </div>
                    <div className="w-[230px] shadow-md rounded-lg">
                        <img src={anh7} alt="" />
                    </div>
                    <div className="w-[230px] shadow-md rounded-lg">
                        <img src={anh4} className="h-[130px] w-[230px]" />
                    </div>
                    <div className="w-[204px] shadow-md rounded-lg">
                        <img src={vnel} alt="" />
                    </div>
                </div>
                <div className="images">
                    <div className="w-[233px] h-[140px] shadow-md rounded-lg">
                        <img src={anh6} alt="" />
                    </div>
                    <div className="w-[230px] shadow-md rounded-lg">
                        <img src={anh7} alt="" />
                    </div>
                    <div className="w-[230px] shadow-md rounded-lg">
                        <img src={anh4} className="h-[130px] w-[230px]" />
                    </div>
                    <div className="w-[204px] shadow-md rounded-lg">
                        <img src={vnel} alt="" />
                    </div>
                </div>
            </div>
           </div>
            <div className="flex justify-between p-16">
                <div className="w-[230px]  shadow-md rounded-lg">
                    <img src={anh2} className="h-[120px] w-[230px]" />
                </div>
                <div className="w-[230px] shadow-md rounded-lg ">
                    <img src={anh3} className="h-[120px] w-[230px]" />
                </div>
                <div className="w-[230px] shadow-md rounded-lg">
                    <img src={anh8} alt="" />
                </div>
                <div className="w-[200px] shadow-md rounded-lg">
                    <img src={anh5} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Partner
