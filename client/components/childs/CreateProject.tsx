import { FunctionComponent, Fragment, Dispatch, SetStateAction, MutableRefObject, useState } from 'react';

import { useDispatch } from 'react-redux';

import { Dialog, Transition } from '@headlessui/react';
import { DocumentAddIcon } from '@heroicons/react/outline';

import { Input } from './';
import { createProject } from '../../store/actions/project.action';

type CreateProjectProps = {
    setOpen: Dispatch<SetStateAction<boolean>>
    cancelButtonRef: MutableRefObject<null>
    onCancel?: () => void;
}
const CreateProject: FunctionComponent<CreateProjectProps> = (props) => {

    const { onCancel, setOpen, cancelButtonRef } = props

    const [projectName, setProjectName] = useState<string>("");

    const dispatch = useDispatch();

    const createNewProject = () => {
        setOpen(false);
        dispatch(createProject({ name: projectName }))
    }

    return (
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 border">
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                &#8203;
            </span>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900 font-poppins">
                                    Create New Project
                                </Dialog.Title>
                                <div className="mt-5 w-full mb-3">
                                    <Input
                                        Icon={DocumentAddIcon}
                                        label="Project name"
                                        name="projectName"
                                        onChange={(ev) => setProjectName(ev.target.value)}
                                        type="text"
                                        value={projectName}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            type="button"
                            className="font-poppins w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-500 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={createNewProject}
                        >
                            Submit
                        </button>
                        {onCancel && (
                            <button
                                type="button"
                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                onClick={() => setOpen(false)}
                                ref={cancelButtonRef}
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </div>
            </Transition.Child>
        </div>
    )
}

export default CreateProject