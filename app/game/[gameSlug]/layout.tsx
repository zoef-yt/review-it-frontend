interface LayoutProps {
	children: React.ReactNode;
}

export default function Layout(props: LayoutProps) {
	const { children } = props;
	return <main className='mx-auto px-4 py-6'>{children}</main>;
}
