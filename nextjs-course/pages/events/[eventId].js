import Head from 'next/head';

import { Fragment } from 'react';
import { getFeaturedEvents, getEventById } from '../../helpers/api-util';

import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/ui/error-alert';

function EventDetailPage(props) {
  const event = props.selectedEvent;

  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta 
          name="description" 
          content="Lorem ipsum dolor sit amet consectetur adipisicing elit."   
        />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

// Here we'll need the context because we'll need to know for which specific event Id we wanna load the event data.
// context.params.eventId -> eventId has to match the name of this file : [eventId];
export async function getStaticProps (context) {
  const eventId = context.params.eventId;
  const event = await getEventById(eventId);

  return {
    props: {
      selectedEvent: event
    },
    revalidate: 30
  }
}

export async function getStaticPaths (params) {
  const events = await getFeaturedEvents();
  const paths = events.map(event => ({params: {eventId: event.id}}));

  return {
    paths: paths,
    fallback: 'blocking'
  }
}

export default EventDetailPage;
