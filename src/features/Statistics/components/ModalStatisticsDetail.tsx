import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import { IBooking } from '../../../types/booking';
import ShowDataRow from './ShowDataRow';
import TableService from './Table/TableService';

function ModalStatisticsDetail({ order }: { order: IBooking }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div>
      <Button onPress={onOpen}>Xem chi tiết</Button>
      <Modal
        size="5xl"
        scrollBehavior="inside"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Thông tin dịch vụ: {order.servicePack}
              </ModalHeader>
              <ModalBody>
                <ShowDataRow
                  title="Tên"
                  data={`${order?.user.firstName} ${order?.user.lastName} `}
                />
                <ShowDataRow title="Địa chỉ" data={order?.address} />
                <ShowDataRow title="Số điện thoại" data={order?.phone} />
                <ShowDataRow
                  title="Số lượng khách"
                  data={order?.numberOfAttendes}
                />
                <ShowDataRow
                  title="Tổng số tiền"
                  data={order?.renters.reduce((preValue, currValue) => {
                    return (
                      preValue + currValue.quantity * currValue.renter.price
                    );
                  }, 0)}
                />
                <ShowDataRow title="Mã thanh toán" data={order?.paypalId} />
                <TableService renters={order.renters} />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ModalStatisticsDetail;
