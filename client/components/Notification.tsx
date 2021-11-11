import { SpeakerphoneIcon, XIcon } from '@heroicons/react/solid';
import { FunctionComponent } from 'react';

type NotificationProps = { label: string; type: "info" | "error" | "warning" }
const Notification: FunctionComponent<NotificationProps> = ({ label, type = "info" }) => {

    const array = ["H", "E", "L"]

    switch (type) {
        case "error":
            return (
                <div>Error Props</div>
            )

        default:
            return (
                <div className="max-h-screen h-screen overflow-y-auto bg-white p-5 overflow-x-hidden relative">
                    <ul className="list-none">
                        {array.map((_, key) => (
                            <li key={key} className="mb-2">
                                <small className="font-poppins font-medium text-gray-600">21 minutes ago</small>

                                <div className="w-full border-2 bg-blue-50 border-blue-100 rounded-md p-2 flex items-center">
                                    <div className={`bg-blue-500 rounded-md shadow-lg p-2 mr-3`}>
                                        <SpeakerphoneIcon className="w-4 h-4 text-white" />
                                    </div>

                                    <p className="font-roboto text-sm">
                                        {label}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
    }
}

export default Notification