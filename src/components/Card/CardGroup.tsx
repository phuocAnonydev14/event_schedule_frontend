import { HTMLAttributes } from 'react';
import { ICardItem } from '../../types/common';
import CardItem from './CardItem';

interface CardGroupProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  data: ICardItem[];
}

function CardGroup({ title, data }: CardGroupProps) {
  return (
    <div className="my-6">
      {title && <h3 className="font-bold mb-4 text-3xl">{title}</h3>}

      <div className="gap-2 grid grid-cols-2 sm:grid-cols-5">
        {!!data.length &&
          data.map((cardItem, index) => (
            <CardItem
              key={index}
              title={cardItem.title}
              banner={cardItem.banner}
            />
          ))}
      </div>
    </div>
  );
}

export default CardGroup;
