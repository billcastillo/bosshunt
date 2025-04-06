// app/page.js
"use client";

import BossHunt from "@/components/BossHunt";
import DarkModeWrapper from "../components/DarkModeWrapper";
import Container from "@mui/material/Container";

export default function Home() {
  return (
    // <DarkModeWrapper>
    <Container maxWidth="sm">
      <BossHunt />
    </Container>
    // </DarkModeWrapper>
  );
}
