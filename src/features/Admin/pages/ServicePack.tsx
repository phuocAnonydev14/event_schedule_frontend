import {
  Accordion,
  AccordionItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';

import { useAllServicePack } from '../apis/settingService.api';
import TitleBorderStart from '../../../components/TitleBorderStart/TitleBorderStart';
import ModalAddServicePack from '../components/Modal/ModalAddServicePack';

function ServicePack() {
  const { data: dataServicePack } = useAllServicePack();
  console.log('dataServicePack', dataServicePack);

  return (
    <div>
      <TitleBorderStart>Quản lý gói dịch vụ</TitleBorderStart>
      <ModalAddServicePack />
      <div className="my-5">
        <Accordion variant="splitted">
          {dataServicePack && dataServicePack?.data.services.length > 0
            ? dataServicePack?.data.services.map((servicePack) => (
                <AccordionItem
                  key={servicePack.id}
                  aria-label={servicePack.title}
                  title={servicePack.title}
                >
                  <Accordion variant="splitted">
                    {servicePack.settings.map((settingItem) => (
                      <AccordionItem
                        key={settingItem.name}
                        aria-label={settingItem.name}
                        title={settingItem.name}
                      >
                        <Table>
                          <TableHeader>
                            <TableColumn>Tên thiết bị</TableColumn>
                            <TableColumn>Đơn vị tính</TableColumn>
                            <TableColumn>
                              Giá tiền<span className="ms-1">(VNĐ)</span>
                            </TableColumn>
                            <TableColumn>Số lượng</TableColumn>
                            <TableColumn>Ghi chú</TableColumn>
                          </TableHeader>
                          <TableBody>
                            {settingItem.renters.map((renter) => (
                              <TableRow key={renter.id}>
                                <TableCell>{renter.renter.name}</TableCell>
                                <TableCell>{renter.renter.unit}</TableCell>
                                <TableCell>{renter.price}</TableCell>
                                <TableCell>{renter.quantity}</TableCell>
                                <TableCell>{renter.renter.note}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </AccordionItem>
              ))
            : []}
        </Accordion>
      </div>
    </div>
  );
}

export default ServicePack;
