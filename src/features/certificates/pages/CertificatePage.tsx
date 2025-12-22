"use client";
import Container from "@/features/global/components/Container";
import React from "react";
import CertificateIntro from "../components/CertificatesIntro";
import CertificatesList from "../components/CertificatesList";

const CertificatePage = () => {
  return (
    <Container>
      <CertificateIntro />
      <CertificatesList />
    </Container>
  );
};

export default CertificatePage;
