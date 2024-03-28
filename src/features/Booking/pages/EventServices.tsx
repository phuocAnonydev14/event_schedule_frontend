import { Card, CardBody, CardFooter, Image, Spinner } from '@nextui-org/react';
import { useAllEvent } from '../../../apis/event.api';
import { Link } from 'react-router-dom';
import TitleBorderStart from '../../../components/TitleBorderStart/TitleBorderStart';

function EventServices() {
  const { data, isLoading } = useAllEvent();

  return (
    <div>
      {isLoading && (
        <div>
          <Spinner />
        </div>
      )}
      {!isLoading && data?.data?.events?.length && (
        <div className="my-6">
          <TitleBorderStart>Các sự kiện</TitleBorderStart>

          <div className="gap-2 grid grid-cols-2 sm:grid-cols-5">
            {data?.data.events.map((cardItem) => (
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
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default EventServices;
