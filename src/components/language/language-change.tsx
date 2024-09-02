"use client";
import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from 'react-bootstrap';
import jsCookie from 'js-cookie';
import { useLocale } from 'next-intl';

const LanguageChange = () => {
    const router = useRouter();
    const locale = useLocale();
    const pathname = usePathname();

    const toggleLang = () => {
        
    };

    return (
        <div className="lang-change">
            <Button
                className={locale === 'en' ? 'mn' : 'en'}
                onClick={toggleLang}
            >
                {locale === 'en' ? 'mn' : 'en'}
            </Button>
        </div>
    );
};

export default LanguageChange;
