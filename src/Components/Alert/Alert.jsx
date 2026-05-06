const alertTypeStyles = {
	success: 'border-green-300 bg-green-100 text-green-800',
	error: 'border-red-300 bg-red-100 text-red-800',
	info: 'border-blue-300 bg-blue-100 text-blue-800',
};

const alertStyles = {
	container: 'flex items-center justify-between rounded-r-lg border-l-4 p-4 shadow-sm',
	message: 'font-instrument text-sm font-medium',
};

function Alert({
	type = 'info',
	message = '',
	className = alertStyles.container,
	messageClassName = alertStyles.message,
}) {
	const alertStyle = alertTypeStyles[type] || alertTypeStyles.info;
	const isError = type === 'error';

	return (
		<div
			role={isError ? 'alert' : 'status'}
			aria-live={isError ? 'assertive' : 'polite'}
			aria-atomic="true"
			className={`${className} ${alertStyle}`}
		>
			{message ? <span className={messageClassName}>{message}</span> : null}
			
		</div>
	);
}

export default Alert;
