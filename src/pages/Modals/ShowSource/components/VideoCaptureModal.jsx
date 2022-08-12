import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import '../../Modals.css';

const VideoCaptureModal = ({ handleClose, open, onTriggerCapture }) => {
  const [sliderInput, setSliderInput] = useState(60);

  const changeSliderInputHandler = (e) => {
    setSliderInput(e.target.value);
  };

  const submitHandler = () => {
    handleClose();
    onTriggerCapture(sliderInput);
  };

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-[300]" onClose={handleClose}>
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
              <Dialog.Panel className="w-full max-w-sm  transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all text-center">
                <div className="text-[#42a7df] text-lg font-semibold text-center">
                  Select Capture Length
                </div>
                <div className="flex justify-end mt-2">
                  <label
                    htmlFor="steps-range"
                    className="block mb-2 text-sm font-semibold text-white bg-primary w-fit p-2 rounded-lg "
                  >
                    {`${sliderInput} S`}
                  </label>
                </div>
                <input
                  id="steps-range"
                  type="range"
                  min="10"
                  max="120"
                  value={sliderInput}
                  step="10"
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer text-primary mb-6"
                  onChange={changeSliderInputHandler}
                />
                <input
                  type="number"
                  id="name"
                  className="modal_form_input"
                  name="name"
                  placeholder="Name"
                  min="10"
                  max="120"
                  onChange={changeSliderInputHandler}
                  value={sliderInput}
                />
                <button
                  onClick={submitHandler}
                  type="button"
                  className="focus:outline-none text-white bg-green/70 hover:bg-green focus:ring-4 focus:ring-green/30 font-medium rounded-lg text-sm px-5 py-2.5 mt-5"
                >
                  Submit
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default VideoCaptureModal;
