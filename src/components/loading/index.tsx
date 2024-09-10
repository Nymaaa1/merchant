"use client";

import React from 'react';
import { useLoading } from '@/context/loading';
import { Container, Spinner } from 'react-bootstrap';

const Loading = () => {
  const { loading, color } = useLoading();

  return (
    <>
      {loading && (
        <div className={`fixed inset-0 bg-opacity-0`} style={{ backdropFilter: 'blur(1px)' }}>
          <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: '100vh', width: '100vw', color: color }}>
            <Spinner animation="border" role="status" style={{ borderColor: color, borderTopColor: 'transparent' }} />
          </Container>
        </div >
      )}
    </>
  );
};

export default Loading;
