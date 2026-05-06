const loaderStyles = {
	container: 'flex items-center justify-center',
	inner: 'flex flex-col items-center gap-3',
	spinner: 'h-10 w-10 animate-spin rounded-full border-4 border-primary/30 border-t-primary',
	message: 'font-instrument text-sm font-semibold text-secondary',
	fullScreen: 'min-h-screen',
};

function Loader({
	message = '',
	fullScreen = false,
	containerClassName = loaderStyles.container,
	innerClassName = loaderStyles.inner,
	spinnerClassName = loaderStyles.spinner,
	messageClassName = loaderStyles.message,
}) {
	return (
		<div
			role="status"
			aria-live="polite"
			className={`${containerClassName} ${fullScreen ? loaderStyles.fullScreen : ''}`}
		>
			<div className={innerClassName}>
				<span aria-hidden="true" className={spinnerClassName} />
				<p aria-hidden="true" className={messageClassName}>
					{message}
				</p>
				<span className="sr-only">{message}</span>
			</div>
		</div>
	);
}

export default Loader;
