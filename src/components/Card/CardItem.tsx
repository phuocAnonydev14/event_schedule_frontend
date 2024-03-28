import { Card, CardBody, CardFooter, Image } from '@nextui-org/react';
import { ICardItem } from '../../types/common';

function CardItem({ banner, title }: ICardItem) {
  return (
    <Card shadow="sm" isPressable onPress={() => console.log('item pressed')}>
      <CardBody className="overflow-visible p-0">
        <Image
          shadow="sm"
          radius="lg"
          width="100%"
          alt={banner}
          className="w-full object-cover h-[140px]"
          src={banner}
        />
      </CardBody>
      <CardFooter className="text-small justify-between">
        <b>{title}</b>
      </CardFooter>
    </Card>
  );
}

export default CardItem;
