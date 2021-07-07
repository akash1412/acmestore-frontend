import Axios from 'axios';

export const uploadImageToCloud = async (data: string) => {
	try {
		const formData = new FormData();
		formData.append('file', data);

		formData.append('upload_preset', 'czgq4bpq');

		const res = await Axios(
			'https://api.cloudinary.com/v1_1/dhqp2dd6b/image/upload',
			{
				method: 'POST',
				data: formData,
			}
		).catch(err => console.error(err));

		//@ts-ignore
		return res.data.url;
	} catch (error) {
		console.error(error.message);

		return undefined;
	}
};

export const createImgPreviewUrl = (file: Blob) => {
	let url;

	if (!file) return;

	const reader = new FileReader();

	reader.readAsDataURL(file);

	reader.onloadend = () => {
		url = reader.result;
	};

	return url;
};
