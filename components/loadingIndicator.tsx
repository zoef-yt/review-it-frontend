interface LoadingIndicatorProps {
	size?: number;
}

export default function LoadingIndicator(props: LoadingIndicatorProps) {
	const { size = 100 } = props;
	console.log('size', size);
	return (
		<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
			<div className='spinner'>
				<div
					style={{
						border: `6px solid transparent`,
						borderRadius: '50%',
						borderTop: '0px solid #3498db',
						borderRight: '3px solid #3498db',
						borderBottom: '0px solid #3498db',
						borderLeft: '3px solid #3498db',
						width: `${size}px`,
						height: `${size}px`,
						animation: 'spin .5s linear infinite',
					}}
				></div>
				<style jsx>{`
					@keyframes spin {
						0% {
							transform: rotate(0deg);
						}
						100% {
							transform: rotate(360deg);
						}
					}
				`}</style>
			</div>
		</div>
	);
}
