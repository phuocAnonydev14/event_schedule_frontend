import { Card, CardBody, CardFooter, Image, Spinner } from '@nextui-org/react';
import { useAllEvent } from '../../../apis/event.api';
import { Link } from 'react-router-dom';

function ServicesHome() {
  const { data, isLoading } = useAllEvent();

  const events =
    Number(data?.data.events?.length) > 6
      ? data?.data.events.slice(6)
      : data?.data.events;

  return (
    <div>
      {isLoading && (
        <div>
          <Spinner />
        </div>
      )}
      {!isLoading && data?.data.events?.length && (
        <div className="my-6 bg-blue-100 h-[auto]">
          <h3 className="font-bold mb-6 text-3xl text-center text-blue-500 ">DỊCH VỤ SỰ KIỆN</h3>

          <div className="gap-2 grid grid-cols-2 sm:grid-cols-5 text-center p-9">
            {events
              ? events.map((cardItem) => (
                <Card
                  key={cardItem.id}
                  as={Link}
                  to={`/dich-vu/${cardItem.id}`}
                  shadow="sm"
                  isPressable
                  onPress={() => console.log('item pressed')}
                >
                  <CardBody className="overflow-visible p-0">
                    <Image
                      shadow="sm"
                      radius="lg"
                      width="100%"
                      alt={cardItem.banner}
                      className="w-full object-cover h-[140px]"
                      src={cardItem.banner || 'https://picsum.photos/200/300'}
                    />
                  </CardBody>
                  <CardFooter className="text-small justify-between">
                    <b>{cardItem.title}</b>
                  </CardFooter>
                </Card>
              ))
              : ''}
          </div>
        </div>
      )}
    </div>
  );
}

export default ServicesHome;
