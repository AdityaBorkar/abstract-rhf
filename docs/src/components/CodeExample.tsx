export default function CodeExample() {
	return (
		<div className="grid grid-cols-3 divide-x divide-border rounded-md border border-border">
			<div className="col-span-2 text-sm">
				<div>
					<div className="flex flex-row font-medium text-sm">
						<div>Tab 1</div>
						<div>Tab 2</div>
						<div>Tab 3</div>
					</div>
					<div>
						<div>Code</div>
						<div>Line Numbers</div>
					</div>
					<div>Copy Button</div>
				</div>
			</div>
			{/* TODO: Ability to adjust divider */}
			<div className="flex items-center justify-center text-sm">
				Code Output
			</div>
		</div>
	);
}
