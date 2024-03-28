import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  useDisclosure,
} from '@nextui-org/react';
import { MdOutlineEdit, MdOutlineDeleteOutline } from 'react-icons/md';
import { useState } from 'react';
import { toast } from 'react-toastify';

import {
  useAllService,
  useDeleteServiceById,
} from '../../apis/settingService.api';

interface TableSettingServiceProps {
  onEdit: (id: string) => void;
}

function TableSettingService({ onEdit }: TableSettingServiceProps) {
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onOpenChange: onOpenChangeDelete,
  } = useDisclosure();
  const [deleteId, setDeleteId] = useState<string>('');
  const { data: services } = useAllService();
  const { mutate: deleteService } = useDeleteServiceById();

  const handleDelete = () => {
    deleteService(deleteId, {
      onSuccess(data) {
        if (data.isSuccess) {
          toast.success('Xóa thành công!');
          onOpenChangeDelete();
        } else {
          toast.error('Xóa thất bại!');
        }
      },
    });
  };

  return (
    <>
      <Modal
        isOpen={isOpenDelete}
        onOpenChange={onOpenChangeDelete}
        onClose={() => {
          setDeleteId('');
        }}
      >
        <ModalContent>
          <ModalHeader>Bạn chắc chắn muốn xóa?</ModalHeader>
          <ModalBody>
            <Button variant="light">Hủy</Button>
            <Button onPress={handleDelete} color="danger">
              Xóa
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Table aria-label="Example table with dynamic content">
        <TableHeader>
          {/* <TableColumn>STT</TableColumn> */}
          <TableColumn>Tên thiết bị</TableColumn>
          <TableColumn>Đơn vị tính</TableColumn>
          <TableColumn>
            Giá tiền<span className="ms-1">(VNĐ)</span>
          </TableColumn>
          <TableColumn>Số lượng</TableColumn>
          <TableColumn>Ghi chú</TableColumn>
          <TableColumn>Khác</TableColumn>
        </TableHeader>

        <TableBody items={services?.data.renters ?? []}>
          {(serviceItem) => (
            <TableRow key={serviceItem.id}>
              {/* <TableCell>{serviceItem.id}</TableCell> */}
              <TableCell>{serviceItem.name}</TableCell>
              <TableCell>{serviceItem.unit}</TableCell>
              <TableCell>{serviceItem.price}</TableCell>
              <TableCell>{serviceItem.quantity}</TableCell>
              <TableCell>{serviceItem.note}</TableCell>
              <TableCell>
                <div className="relative flex items-center gap-2">
                  <Tooltip content="Chỉnh sửa">
                    <Button
                      onPress={() => onEdit(serviceItem.id)}
                      isIconOnly
                      aria-label="Chỉnh sửa"
                    >
                      <MdOutlineEdit />
                    </Button>
                  </Tooltip>
                  <Tooltip color="danger" content="Xóa">
                    <Button
                      onPress={() => {
                        setDeleteId(serviceItem.id);
                        onOpenDelete();
                      }}
                      isIconOnly
                      color="danger"
                      aria-label="Xóa"
                    >
                      <MdOutlineDeleteOutline />
                    </Button>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}

export default TableSettingService;
