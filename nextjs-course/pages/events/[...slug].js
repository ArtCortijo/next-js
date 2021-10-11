import { Fragment } from 'react';
import { useRouter } from 'next/router';
import { getFilteredEvents } from '../../dummy-data';
import EventList from '../../components/events/EventList';
import ResultTitle from '../../components/events/results-title';
import Button from '../../components/ui/Button';
import ErrorAlert from '../../components/ui/error-alert';

function FilteredEventsPage() {
	const router = useRouter();
	const filterData = router.query.slug;
	console.log(filterData);

	if (!filterData) {
		return <p className="center">Loading...</p>
	}

	const filteredYear = filterData[0];
	const filteredMonth = filterData[1];

	const numYear = +filteredYear;
	const numMonth = +filteredMonth;

	if (
		isNaN(numYear) || 
		isNaN(numMonth) || 
		numYear > 2030 || 
		numYear < 2021 || 
		numMonth < 1 || 
		numMonth > 12
	) {
		return (
			<Fragment>
				<div className="center">
					<ErrorAlert><p>Invalid filter. Please adjust your values!</p></ErrorAlert>
					<Button link="/events">Show all events</Button>
				</div>
			</Fragment>
		)
	}

	const filteredEvents = getFilteredEvents({
		year: numYear,
		month: numMonth
	});

	if (!filteredEvents || filteredEvents.length === 0) {
		return (
			<Fragment>
				<p>No events found for the chosen filter.</p>
				<div className="center">
					<Button link="/events">Show all events</Button>
				</div>
			</Fragment>
		)
	}

	const date = new Date(numYear, numMonth -1);

	return (
		<Fragment>
			<ResultTitle date={date} />
			<EventList items={filteredEvents} />
		</Fragment>
	)
}

export default FilteredEventsPage;