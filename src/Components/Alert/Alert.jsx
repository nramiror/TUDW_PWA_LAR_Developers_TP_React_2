const typeStyles = {
	success: 'border-green-300 bg-green-100 text-green-800',
	error: 'border-red-300 bg-red-100 text-red-800',
	info: 'border-blue-300 bg-blue-100 text-blue-800',
};

function Alert({ type = 'info', message = '', onClose }) {
	const alertStyle = typeStyles[type] || typeStyles.info;
	const isError = type === 'error';

	return (
		<div
			role={isError ? 'alert' : 'status'}
			aria-live={isError ? 'assertive' : 'polite'}
			aria-atomic="true"
			className={`flex items-center justify-between rounded-r-lg border-l-4 p-4 shadow-sm ${alertStyle}`}
		>
			{message ? <span className="font-instrument text-sm font-medium">{message}</span> : null}

			{onClose && (
				<button
					type="button"
					onClick={onClose}
					aria-label="Cerrar alerta"
					className="ml-4 font-bold transition hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
				>
					✕
				</button>
			)}
		</div>
	);
}

export default Alert;
