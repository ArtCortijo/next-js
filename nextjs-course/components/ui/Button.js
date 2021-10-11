import Link from "next/link";
import classes from "./Button.module.css";

function Button (props) {
	if (props.link) {
		return (
			<Link href={props.link}>
				{/* to add an element inside of the link component, we need to add an anchor tag element.   */}
				<a className={classes.btn}>{props.children}</a>
			</Link>
		)
	}

	return <button className={classes.btn} onClick={props.onClick}>{props.children}</button>;
}

export default Button;