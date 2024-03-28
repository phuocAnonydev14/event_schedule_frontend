import { useMemo, useState } from 'react';
import { FormProvider } from 'react-hook-form';
import * as Yup from 'yup';
import { Button } from '@nextui-org/react';
import { MdPostAdd } from 'react-icons/md';

import Editor from '../../../components/Editor/Editor';
import useFormWithYup from '../../../hooks/useFormWithYup';
import CInput from '../../../components/CInput';
import CSelect from '../../../components/CSelect';
import { useAllCategoriesService } from '../apis/settingService.api';
import { useAddEvent } from '../apis/event.api';
import { toast } from 'react-toastify';
import TitleBorderStart from '../../../components/TitleBorderStart/TitleBorderStart';

const postSchema = Yup.object().shape({
  title: Yup.string().required('Vui lòng nhập trường này!'),
  banner: Yup.string().required('Vui lòng chọn ảnh banner!'),
});

const initValue = {
  title: '',
  banner: '',
};

function Post() {
  const [editorValue, setEditorValue] = useState('');
  const methods = useFormWithYup(postSchema, {
    defaultValues: initValue,
  });

  const { data: allCategories } = useAllCategoriesService();
  const { mutate: addEventMutate } = useAddEvent();

  const serviceOptions = useMemo(() => {
    if (allCategories?.data.services.length) {
      return allCategories?.data.services.map((serviceItem) => ({
        label: serviceItem.title,
        value: serviceItem.id,
      }));
    }
    return [];
  }, [allCategories?.data]);

  const { handleSubmit, reset } = methods;

  const submitHandler = handleSubmit((values) => {
    console.log('values', values);
    addEventMutate(
      {
        ...values,
        startDate: '',
        endDate: '',
        content: editorValue,
      },
      {
        onSuccess(data) {
          if (data.isSuccess) {
            toast.success('Đăng bài thành công!');
            reset(initValue);
            setEditorValue('');
          } else {
            toast.error('Đăng bài thất bại!');
          }
        },
      },
    );
  });

  return (
    <div>
      <TitleBorderStart>Đăng bài dịch vụ</TitleBorderStart>

      <FormProvider {...methods}>
        <form onSubmit={submitHandler}>
          <CSelect
            id="service"
            name="service"
            placeholder="Chọn dịch vụ"
            label="Dịch vụ"
            options={serviceOptions}
          />
          <CInput
            id="title"
            name="title"
            placeholder="Nhập tên dịch vụ"
            label="Tên dịch vụ"
          />
          <CInput
            id="banner"
            name="banner"
            placeholder="Link ảnh đại diện"
            label="Ảnh đại diện"
          />
          <Editor
            value={editorValue}
            onChange={(value) => setEditorValue(value)}
          />
          <div className="text-right mt-4">
            <Button
              color="primary"
              type="submit"
              startContent={<MdPostAdd size={18} />}
            >
              Đăng bài
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default Post;
