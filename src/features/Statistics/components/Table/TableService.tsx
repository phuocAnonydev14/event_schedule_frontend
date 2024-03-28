import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import { IServiceItem } from '../../../../types/service';

interface TableServiceProps {
  renters: IServiceItem[];
}

function TableService({ renters }: TableServiceProps) {
  return (
    <>
      <h6 className="w-[10rem] font-semibold ">Danh sách thiết bị</h6>
      <Table aria-label="Example table with dynamic content" className="mt-2">
        <TableHeader>
          <TableColumn>STT</TableColumn>
          <TableColumn>Tên thiết bị</TableColumn>
          <TableColumn>Đơn vị tính</TableColumn>
          <TableColumn>
            Giá tiền<span className="ms-1">(VNĐ)</span>
          </TableColumn>
          <TableColumn>Số lượng</TableColumn>
          <TableColumn>Ghi chú</TableColumn>
        </TableHeader>

        <TableBody>
          {renters.length
            ? renters.map((serviceItem, index) => (
                <TableRow key={serviceItem.renter.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{serviceItem.renter.name}</TableCell>
                  <TableCell>{serviceItem.renter.unit}</TableCell>
                  <TableCell>{serviceItem.renter.price}</TableCell>
                  <TableCell>{serviceItem.quantity}</TableCell>
                  <TableCell>{serviceItem.renter.note}</TableCell>
                </TableRow>
              ))
            : []}
        </TableBody>
      </Table>
    </>
  );
}

export default TableService;
