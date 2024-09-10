"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from 'react-bootstrap';

interface TopbarProps { }

const TopbarNoLogin: React.FC<TopbarProps> = () => {
    return (
        <div className="Topbar">
            <div className="top-left-side">
                <div className="mobile-logo">
                    <Link href="/">
                        <Image src="/logo/monpay-logo.png" alt='' width={100} height={100} />
                    </Link>
                </div>
                <div className="topbar-inner">
                    <div className="image ">
                        <Image src={"/logo/monpay-logo.png"} alt='' width={150} height={50} />
                    </div>
                </div>
            </div>
            <div className="top-right-side">
                <div className="mp-profile-menu">
                    <div className="inner d-flex align-items-center">
                        <Link href={"/auth/login"}> <Button style={{ color: "#ffff", backgroundColor: "#4341CC", padding: "5px", width: "100px", borderRadius: "8px" }}>Нэвтрэх</Button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopbarNoLogin;
