import { FC } from 'react';

type SettingType = 'image' | 'text' | 'select';

interface SettingItemProps {
  title: string;
  initialValue?: string;
  type?: SettingType;
  desc?: string;
}

const InfoItem: FC<SettingItemProps> = ({ title, initialValue }) => {
  return (
    <>
      <div className="flex flex-col w-1/3 mb-4">
        <label
          htmlFor={title}
          className="font-semibold px-2 fon first-letter: text-2xl"
        >
          {title}
        </label>
        <input
          id={title}
          name={title}
          value={initialValue}
          disabled
          className=" px-2 bg-white border-b-2  text-lg"
        />
      </div>
    </>
  );
};

export default InfoItem;
