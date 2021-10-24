import Head from 'next/head';
import { getFeaturedEvents } from '../helpers/api-util';
import EventList from '../components/events/event-list';

function HomePage(props) {

  return (
    <div>
      {/* Next.js Head component - You can add any HTML elements that would normally go into the head section of your page. */}
      <Head>
        <title>Arturo's NextJS Events</title>
        <meta 
          name="description" 
          content="Lorem ipsum dolor sit amet consectetur adipisicing elit."   
        />
      </Head>
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
