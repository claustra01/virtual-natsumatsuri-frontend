interface GetImageProps {
	images: string[];
	alt: string;
	width: number;
	height: number;
}

const GetImage: React.FC<GetImageProps> = ({ images, alt }) => {
	const randomImage = images[Math.floor(Math.random() * images.length)];

	return (
		<img
			src={randomImage}
			alt={alt}
			style={{ display: "block", margin: "0 auto" }}
			width={360}
			height={360}
		/>
	);
};

export default GetImage;
