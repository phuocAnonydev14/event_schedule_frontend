type AdvantageList = {
  icon: JSX.Element;
  title: string;
  desc: string;
};
const advantageList: AdvantageList[] = [
  {
    icon: (
      <>
        {' '}
        <path
          className="stroke-current text-purple-100"
          d="M30 39.313l-4.18 2.197L27 34.628l-5-4.874 6.91-1.004L32 22.49l3.09 6.26L42 29.754l-3 2.924"
          strokeLinecap="square"
          strokeWidth="2"
          fill="none"
          fillRule="evenodd"
        />
        <path
          className="stroke-current text-purple-300"
          d="M43 42h-9M43 37h-9"
          strokeLinecap="square"
          strokeWidth="2"
        />
      </>
    ),
    title: 'Quy trình tổ chức sự kiện chuyên nghiệp',
    desc: 'Không chỉ là những màn trình diễn đặc sắc, các tiết mục của chúng tôi liên tục đổi mới để đem đến cho khách hàng trải nghiệm độc đáo, mới mẻ và vô cùng hấp dẫn.',
  },
  {
    icon: (
      <>
        <path
          className="stroke-current text-purple-100"
          strokeWidth="2"
          strokeLinecap="square"
          d="M21 23h22v18H21z"
          fill="none"
          fillRule="evenodd"
        />
        <path
          className="stroke-current text-purple-300"
          d="M26 28h12M26 32h12M26 36h5"
          strokeWidth="2"
          strokeLinecap="square"
        />
      </>
    ),
    title: 'Chương trình sáng tạo',
    desc: 'Chúng tôi liên tục brainstorming để đưa ra những concept, ý tưởng sáng tạo nhất cho chương trình.',
  },
  {
    icon: (
      <g
        transform="translate(22 21)"
        strokeLinecap="square"
        strokeWidth="2"
        fill="none"
        fillRule="evenodd"
      >
        <path
          className="stroke-current text-purple-100"
          d="M17 22v-6.3a8.97 8.97 0 003-6.569A9.1 9.1 0 0011.262 0 9 9 0 002 9v1l-2 5 2 1v4a2 2 0 002 2h4a5 5 0 005-5v-5"
        />
        <circle
          className="stroke-current text-purple-300"
          cx="13"
          cy="9"
          r="3"
        />
      </g>
    ),
    title: 'Cam kết chất lượng',
    desc: 'Chúng tôi là đơn vị duy nhất tại Hà Nội cam kết về chất lượng chương trình. Nếu có bất kỳ điều gì khiến quý khách không hài lòng, chúng tôi cam kết hoàn tiền từ 50-100% mà không hỏi thêm bất kỳ điều gì.',
  },
];

function Advantage() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="text-2xl">LÝ DO BẠN NÊN CHỌN HANOI’S EVENT</h2>
          </div>

          {/* Items */}
          <div
            className="max-w-sm mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-16 items-start md:max-w-2xl lg:max-w-none"
            data-aos-id-blocks
          >
            {advantageList.map((adv) => (
              <div
                key={adv.title}
                className="relative flex flex-col items-center"
                data-aos="fade-up"
                data-aos-anchor="[data-aos-id-blocks]"
              >
                <svg
                  className="w-16 h-16 mb-4"
                  viewBox="0 0 64 64"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    className="fill-current text-blue-600"
                    width="64"
                    height="64"
                    rx="32"
                  />
                  {adv.icon}
                </svg>
                <h5 className="h4 mb-2">{adv.title}</h5>
                <p className="text-lg text-gray-400 text-center">{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Advantage;
