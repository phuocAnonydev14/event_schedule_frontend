import { Card, CardBody } from '@nextui-org/card';

const valueList = [
  'Chuyên Nghiệp và Tin Cậy',
  'Tạo ra không gian ấn tượng với thiết kế và trang trí sáng tạ',
  'Kỹ năng chuyên nghiệp mang đến sự tận tâm và tận tình trong từng chi tiết',
  'Mang đến gói dịch vụ toàn diện để bạn có thể yên tâm và tận hưởng sự kiện của mình',
  'Tối ưu hóa chi phí và thời gian',
];
function Value() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 border-t border-gray-800">
          {/* Section header */}

          <div className="grid gap-20">
            <div className="md:grid md:grid-cols-12 md:gap-6 items-center">
              <div
                className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1"
                data-aos="fade-up"
              >
                <Card>
                  <CardBody>
                    <ul className="text-lg text-gray-400 -mb-2">
                      {valueList.map((value) => (
                        <li key={value} className="flex items-baseline mb-2">
                          <svg
                            className="w-3 h-3 fill-current text-green-500 mr-2 shrink-0"
                            viewBox="0 0 12 12"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                          </svg>
                          <span>{value}</span>
                        </li>
                      ))}
                    </ul>
                  </CardBody>
                </Card>
              </div>

              <div
                className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6"
                data-aos="fade-right"
              >
                <div className="max-w-3xl mx-auto  mb-12">
                  <h1 className="h2 text-2xl">GIÁ TRỊ CỦA HANOI’S EVENT</h1>
                </div>
                <div className="md:pr-4 lg:pr-12 xl:pr-16">
                  <h3 className="h3 mb-3">
                    HANOI’S EVENT tổ chức sự kiện giúp cho doanh nghiệp có thể
                    tiếp cận khách hàng tốt hơn, đồng thời tăng thêm độ nhận
                    diện cho thương hiệu.
                  </h3>
                  <p className="text-xl text-gray-400 mb-4">
                    Dù là bất kỳ sự kiện nào, HANOI’S EVENT cũng luôn hướng đến
                    các giá trị như:
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Value;
