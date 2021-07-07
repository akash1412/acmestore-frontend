import { useState } from 'react';

export default function useForm(initial: any) {
	const [inputs, setInputs] = useState(initial);

	const handleChange = (e: any) => {
		let { name, value, type }: { name: any; value: any; type: any } = e.target;

		if (type === 'number') {
			value = parseInt(value);
		}

		if (type === 'file') {
			value = e.target.files[0];
		}

		setInputs({ ...inputs, [name]: value });
	};

	const resetForm = () => {
		setInputs(initial);
	};

	const clearForm = () => {
		const blankState = Object.fromEntries(
			Object.entries(inputs).map(([key, value]) => [key, ''])
		);

		setInputs(blankState);
	};

	return { inputs, handleChange, resetForm, clearForm };
}
