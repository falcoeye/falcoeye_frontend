import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Loader from '../../Components/UI/Loader/Loader';
import LoadingSpinner from '../../Components/UI/LoadingSpinner/LoadingSpinner';
import axios from '../../utility/api-instance';
import './Modals.css';
const EditSource = ({ handleClose, id, open }) => {
	const [disableSubmit, setDisableSubmit] = useState(true);
	const [sendingRequest, setSendingRequest] = useState(false);
	const [errorMessage, setErrorMessage] = useState(false);

	const [data, setData] = useState(null);
	const [fetching, setFetching] = useState(false);

	useEffect(() => {
		if (!id) return;
		setFetching(true);
		axios
			.get(`/camera/${id}`)
			.then((res) => {
				setFetching(false);
				setData(res.data.camera);
			})
			.catch((err) => {
				setFetching(false);
				toast.error(err.response?.data?.message);
			});
	}, [id]);

	useEffect(() => {
		if (!data) return;
		const dataFields = Object.keys(data);
		let hasNull = false;
		dataFields.forEach((key) => {
			if (data[key] === null || data[key] === '') {
				hasNull = true;
			}
		});
		setDisableSubmit(hasNull);
	}, [data]);

	const handleChange = (e) => {
		const { name, value, type } = e.target;
		if (type === 'number') {
			setData((preVal) => {
				return {
					...preVal,
					[name]: +value,
				};
			});
			return;
		}
		setData((preVal) => {
			return {
				...preVal,
				[name]: value,
			};
		});
	};
	const handleStreamingTypeChange = (e) => {
		handleChange(e);
		if (e.target.value === 'RSTP') {
			// setShowRSTP(true);
		} else {
			// setShowRSTP(false);
		}
	};
	const convertBase64 = (file) => {
		return new Promise((resolve, reject) => {
			const fileReader = new FileReader();
			fileReader.readAsDataURL(file);
			fileReader.onload = () => {
				resolve(fileReader.result);
			};
			fileReader.onerror = (error) => {
				reject(error);
			};
		});
	};
	const handleImageUpload = async (event) => {
		const file = event.target.files[0];
		const base64 = await convertBase64(file);
		setData((preVal) => {
			return {
				...preVal,
				thumbnail: base64,
			};
		});
		data.thumbnail = base64;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSendingRequest(true);
		try {
			//const res = await axios.put("/camera/", data);
			//dispatch(editSource(res.data.camera))
			/* dispatch(editSource(data)) */
			setSendingRequest(false);
			handleClose();
		} catch (error) {
			setErrorMessage(error.response.data.message || 'Something went wrong');
			if (error.response.data.errors) {
				let errorObjectKeys = Object.keys(error.response.data.errors);
				errorObjectKeys.forEach((key) => {
					toast.error(`${key}: ${error.response.data.errors[`${key}`]}`);
				});
			}
			setSendingRequest(false);
		}
	};

	let content;

	if (fetching) {
		content = <Loader />;
	}
	if (!data && !fetching) {
		content = (
			<h3 className="text-lg text-center font-medium leading-6 text-gray-900">
				There is no info about this source
			</h3>
		);
	}
	if (data && !fetching) {
		content = (
			<Fragment>
				<div className="cmb_heading">Edit a Source</div>
				<form>
					<input
						type="text"
						id="name"
						className="modal_form_input"
						name="name"
						placeholder="Name"
						onChange={handleChange}
						value={data.name}
					/>
					<input
						type="number"
						id="utm_x"
						className="modal_form_input "
						name="utm_x"
						placeholder="longitude"
						onChange={handleChange}
						value={data.utm_x}
					/>
					<input
						type="number"
						id="utm_y"
						className="modal_form_input "
						name="utm_y"
						placeholder="latitude"
						onChange={handleChange}
						value={data.utm_y}
					/>
					<select
						id="streaming_type"
						className="modal_form_input "
						name="streaming_type"
						onChange={(e) => {
							handleStreamingTypeChange(e);
						}}
					>
						<option value="-">--SELECT--</option>
						<option value="RSTP">RSTP</option>
						<option value="STREAMINGSERVER">STREAMING SERVER</option>
					</select>
					<input
						type="text"
						id="url"
						className="modal_form_input "
						name="url"
						placeholder="url"
						onChange={handleChange}
						value={data.url}
					/>
					<input
						type="text"
						id="host"
						className="modal_form_input "
						name="host"
						placeholder="host"
						onChange={handleChange}
						value={data.host}
					/>

					<input
						type="number"
						id="port"
						className="modal_form_input "
						name="port"
						placeholder="port"
						onChange={handleChange}
						value={data.port}
					/>

					<input
						type="text"
						id="username"
						className="modal_form_input "
						name="username"
						placeholder="username"
						onChange={handleChange}
						value={data.username}
					/>
					<input
						type="password"
						id="password"
						className="modal_form_input "
						name="password"
						placeholder="password"
						onChange={handleChange}
						value={data.password}
					/>
					<div>
						<label
							htmlFor="thumbnail"
							className="image_upload_label"
							style={{ margin: '5px auto' }}
						>
							Upload Source Thumbnail
							<input
								style={{
									visibility: 'hidden',
									position: 'absolute',
									zIndex: '-1',
								}}
								type="file"
								id="thumbnail"
								accept="image/*"
								className="modal_form_input "
								name="thumbnail"
								placeholder="Source Thumbnail"
								onChange={handleImageUpload}
							/>
						</label>
					</div>
					{errorMessage && <p className="error_text">{errorMessage}</p>}
					<button
						style={{ margin: '25px auto', display: 'block' }}
						className={`login_form_btn ${
							disableSubmit && 'disable_submit_btn'
						}`}
						onClick={handleSubmit}
					>
						{sendingRequest ? <LoadingSpinner /> : 'Edit Source'}
					</button>
				</form>
			</Fragment>
		);
	}

	return (
		<Transition appear show={open} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={handleClose}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black bg-opacity-25" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
								{content}
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default EditSource;
