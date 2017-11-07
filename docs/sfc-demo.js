function Person({ name, gender }) {
	return (
		<div className="person">
			<h1>{name}</h1>
		</div>
	);
}

Person.propTypes = {
	name: PropTypes.string,
	gender: PropTypes.string
};

Person.defaultProps = {
	name: '',
	gender: 'male'
};

export default Person;
