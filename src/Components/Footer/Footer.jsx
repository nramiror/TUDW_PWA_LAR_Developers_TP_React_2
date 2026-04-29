const socialLinks = [
	{
		label: 'Facebook',
		href: 'https://www.facebook.com',
		innerSize: 28,
		svg: (
			<path d="M15.5 2h-3.1C8.1 2 5.5 4.6 5.5 8v2.8H3v3.4h2.5V22h3.7v-7.8H12l.6-3.4H9.2V8c0-1 .8-1.8 1.8-1.8h2.5V2z" />
		),
	},
	{
		label: 'Instagram',
		href: 'https://www.instagram.com',
		innerSize: 26,
		svg: (
			<path d="M7 2.5h10A4.5 4.5 0 0 1 21.5 7v10a4.5 4.5 0 0 1-4.5 4.5H7A4.5 4.5 0 0 1 2.5 17V7A4.5 4.5 0 0 1 7 2.5Zm0 2A2.5 2.5 0 0 0 4.5 7v10A2.5 2.5 0 0 0 7 19.5h10a2.5 2.5 0 0 0 2.5-2.5V7A2.5 2.5 0 0 0 17 4.5H7Zm5 2.5a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5-3.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z" />
		),
	},
	{
		label: 'X',
		href: 'https://x.com',
		innerSize: 24,
		svg: (
			<path d="M19.7 2H22l-7.85 8.94L23 22h-6.9l-5.4-7.1L4.4 22H2l8.4-9.57L1 2h7.1l5.02 6.58L19.7 2Zm-1.26 18h1.54L7.54 3.9H5.92L18.44 20Z" />
		),
	},
];

function Footer() {
	return (
		<footer className="relative border-t border-[#829AB1]/50 bg-[linear-gradient(to_left,#E2F3FF_0%,#FFFFFF_100%)] px-4 py-1 text-slate-700 shadow-[0_-1px_12px_rgba(15,23,42,0.04)]">
				<div className="mx-auto max-w-7xl px-2 text-center">
					<div
						className="inline-block leading-tight text-slate-800"
						style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 400 }}
					>
						<p className="text-[14px] font-normal">
							Copyright © 2026 ReactGames LAR Developers
						</p>
						<p className="text-[14px] font-normal">Av. Siempre Viva 742</p>
					</div>
				</div>

				<nav aria-label="Social media" className="absolute right-6 top-1/2 transform -translate-y-1/2 flex items-center gap-4">
					{socialLinks.map(({ label, href, innerSize, svg }) => (
						<a
							key={label}
							href={href}
							target="_blank"
							rel="noreferrer"
							aria-label={label}
							className="inline-flex items-center justify-center text-[#1E3A5F] transition hover:-translate-y-0.5 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
							style={{ width: `${innerSize + 6}px`, height: `${innerSize + 6}px` }}
						>
							<svg
								viewBox="0 0 24 24"
								fill="currentColor"
								aria-hidden="true"
								className="block"
								style={{ width: `${innerSize}px`, height: `${innerSize}px` }}
							>
								{svg}
							</svg>
						</a>
					))}
				</nav>
		</footer>
	);
}

export default Footer;
