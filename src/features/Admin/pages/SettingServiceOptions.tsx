import { useDisclosure } from '@nextui-org/react';

import TableSettingService from '../components/Table/TableSettingService';
import ModalSettingService from '../components/Modal/ModalSettingService';
import { useState } from 'react';

function SettingServiceOptions() {
  const [editId, setEditId] = useState<string>('');
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleEdit = (id: string) => {
    onOpenChange();
    setEditId(id);
  };

  return (
    <div>
      <ModalSettingService
        onOpenChange={onOpenChange}
        onOpen={onOpen}
        isOpen={isOpen}
        editId={editId}
        onSetEditId={setEditId}
      />
      <TableSettingService onEdit={handleEdit} />
    </div>
  );
}

export default SettingServiceOptions;
