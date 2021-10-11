import { Fragment } from 'react'
import { useRouter } from 'next/router';
import { getEventById } from '../../dummy-data';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/ui/error-alert';

function EventDetailPage() {
	const router = useRouter();

	// this gives us access to the concrete value that was inserted in the URL when the page is loaded
	// ex: http://localhost:3000/events/i2 -> router.query.eventId is i2.
	
	const eventId = router.query.eventId;
	const event = getEventById(eventId);

	if (!event) {
		return (
			<ErrorAlert>
				<p>Sorry, no event found!</p>
			</ErrorAlert>
		)
	}

	return (
		<Fragment>
			<EventSummary title={event.title} />
			<EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.title} />
			<EventContent>
				<p>{event.description}</p>
			</EventContent>
		</Fragment>
	)
}

export default EventDetailPage;