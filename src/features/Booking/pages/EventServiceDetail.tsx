import { useParams } from 'react-router-dom';
import { Spinner } from '@nextui-org/react';

import { useGetEventById } from '../../../apis/event.api';
import EditorDisplay from '../../../components/Editor/EditorDisplay';

function EventServiceDetail() {
  const { id } = useParams();
  const { data: eventData, isLoading } = useGetEventById(id);
  const event = eventData?.data.event;

  return (
    <>
      {isLoading && <Spinner />}

      {event && (
        <div className="my-4 pl-4">
          <h1 className="font-bold text-4xl mb-4">{event.title}</h1>

          <EditorDisplay value={event.content} />
        </div>
      )}
    </>
  );
}

export default EventServiceDetail;
