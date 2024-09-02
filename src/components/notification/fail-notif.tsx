'use client';
import React, { useState, useEffect } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { useLocale } from 'next-intl';

interface FailNotificationProps {
    show: boolean;
    infos: string;
    position?: 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';
    close: () => void;
}

const FailNotification: React.FC<FailNotificationProps> = ({ show, infos, position: pos = 'top-end', close }) => {
    const [position, setPosition] = useState<'top-start' | 'top-end' | 'bottom-start' | 'bottom-end'>('top-end');
    const [state, setState] = useState(false);
    const locale = useLocale();

    useEffect(() => {
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
                className="success-alert fail"
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
                        {locale === 'en' ? 'Error' : 'Амжилтгүй'}
                    </h5>
                </Toast.Header>
                <Toast.Body>{infos}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
};

export default FailNotification;
