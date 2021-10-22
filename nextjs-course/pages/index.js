import { getFeaturedEvents } from '../helpers/api-util';
import EventList from '../components/events/event-list';

function HomePage(props) {

  return (
    <div>
      <EventList items={props.events} />
    </div>
  );
}

// Since it's the main page, we want to have the data ready to go asap
export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents
    },
    //30 minutes
    revalidate: 1800
  }
}

export default HomePage;
