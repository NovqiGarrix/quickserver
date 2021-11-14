import { FunctionComponent, useRef, Fragment, Dispatch, SetStateAction, MutableRefObject } from 'react';

import { Dialog, Transition } from '@headlessui/react'

type ModalProps = {
    cancelButtonRef: MutableRefObject<null>;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>
}

const Modal: FunctionComponent<ModalProps> = (props) => {

    const { children, open, setOpen, cancelButtonRef } = props

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
                {children}
            </Dialog>
        </Transition.Root>
    )

}

export default Modal