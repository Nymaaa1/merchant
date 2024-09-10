'use client';
import React, { useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { useLocale } from 'next-intl';

interface NotificationProps {
    show: boolean;
    infos: string;
    pos?: 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';
    close: () => void;
}

const Notification: React.FC<NotificationProps> = ({ show, infos, pos, close }) => {
    const [position, setPosition] = useState<'top-start' | 'top-end' | 'bottom-start' | 'bottom-end'>('top-end');
    const [state, setState] = useState(false);
    const locale = useLocale();

    React.useEffect(() => {
        if (show) setState(show);
        if (pos) setPosition(pos);
    }, [show, pos]);

    return (
        <ToastContainer
            position={position}
            bsPrefix="toast-container position-fixed"
            style={{ zIndex: 9 }}
        >
            <Toast
                className="success-alert"
                onClose={() => {
                    setState(false);
                    setTimeout(() => {
                        close();
                    }, 100);
                }}
                show={state}
                delay={3000}
                autohide
            >
                <Toast.Header>
                    <h5 className="alert-header">
                        {locale === 'en' ? 'Success' : 'Амжилттай'}
                    </h5>
                </Toast.Header>
                <Toast.Body>{infos}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
};

export default Notification;
