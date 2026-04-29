function Loader({ message = 'Cargando juegos...', fullScreen = false }) {
	return (
		<div
			role="status"
			aria-live="polite"
			className={`flex items-center justify-center ${fullScreen ? 'min-h-screen' : ''}`}
		>
			<div className="flex flex-col items-center gap-3">
				<span
					aria-hidden="true"
					className="h-10 w-10 animate-spin rounded-full border-4 border-primary/30 border-t-primary"
				/>
				<p aria-hidden="true" className="font-instrument text-sm font-semibold text-secondary">
					{message}
				</p>
				<span className="sr-only">{message}</span>
			</div>
		</div>
	);
}

export default Loader;
