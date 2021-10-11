import { Fragment } from 'react';
import { useRouter } from 'next/router'
import { getAllEvents } from '../../dummy-data';
import EventList from '../../components/events/EventList';
import EventsSearch from '../../components/events/events-search';

function AllEventsPage() {
	const events = getAllEvents();
	console.log(events);

	const router = useRouter();

	function findEventsHandler (year, month) {
		// with one dynamic segment, next.js will look for [eventId].js cause it's specific to one page. But there's no specific page for more than one dynamic segment so it will use [...slug].js
		const fullPath = `/events/${year}/${month}`;
		router.push(fullPath);	
	}

	return (
		<Fragment>
			<EventsSearch onSearch={findEventsHandler} />
			<EventList items={events} />
		</Fragment>
	)
}

export default AllEventsPage;