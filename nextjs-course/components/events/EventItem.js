import classes from './EventItem.module.css';
import DateIcon from '../icons/date-icon';
import AddressIcon from '../icons/address-icon';
import ArrowIcon from '../icons/arrow-right-icon';
import Button from '../ui/Button';

function EventItem(props) {
	const { title, image, date, location, id } = props;
	const readableDate = new Date(date).toLocaleDateString('en-US', {
			day: 'numeric', 
			month: 'long', 
			year: 'numeric'
	});
	const formattedAddress = location.replace(', ', '\n');
	const exploreLink = `/events/${id}`;

	return (
		<li className={classes.item}>
			<img src={`/${image}`} alt={title} />
			<div className={classes.content}>
				<div className={classes.summary}>
					<h2>{title}</h2>
					<div className={classes.date}>
						<DateIcon />
						<time>{readableDate}</time>
					</div>
					<div className={classes.address}>
						<AddressIcon />
						<address>{formattedAddress}</address>
					</div>
				</div>
				<div className={classes.actions}>
					<Button link={exploreLink}>
						<span>Explore Event</span>
						<span className={classes.icon}><ArrowIcon /></span>
					</Button>
				</div>
			</div>
		</li>
	)
}

export default EventItem;