// app/page.tsx
"use client";

import { useState } from "react";
import {
  Autocomplete,
  TextField,
  Button,
  Typography,
  Box,
  Container,
} from "@mui/material";
import { format, addHours } from "date-fns";
import type { BossProps } from "@/interface/boss";
import { bosses } from "@/constants/config";

export default function Home() {
  const [selectedBoss, setSelectedBoss] = useState<BossProps | null>(null);
  const [respawnTime, setRespawnTime] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [webhookStatus, setWebhookStatus] = useState<string | null>(null);

  const calculateRespawnTime = (): void => {
    if (!selectedBoss) return;

    const currentTime = new Date();
    const nextRespawn = addHours(currentTime, selectedBoss.respawnHours);

    setRespawnTime(nextRespawn);
    setWebhookStatus(null);
  };

  const sendToDiscord = async (): Promise<void> => {
    if (!selectedBoss || !respawnTime) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/discord-webhook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bossName: selectedBoss.name,
          respawnTime: respawnTime.toISOString(),
          respawnHours: selectedBoss.respawnHours,
        }),
      });

      if (response.ok) {
        setWebhookStatus("Sent to Discord successfully!");
      } else {
        setWebhookStatus("Failed to send to Discord. Try again later.");
      }
    } catch (error) {
      setWebhookStatus("Error: Could not connect to server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, p: 4 }}>
      <Typography
        variant="h3"
        component="h1"
        sx={{ textAlign: "center", fontWeight: "bold", mb: 8 }}
      >
        Boss Hunt
      </Typography>

      <Autocomplete
        id="boss-select"
        options={bosses}
        getOptionLabel={(boss: BossProps) => boss.name}
        onChange={(event, newValue: BossProps | null) => {
          setSelectedBoss(newValue);
          setRespawnTime(null);
          setWebhookStatus(null);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Choose boss"
            variant="outlined"
            fullWidth
            margin="normal"
          />
        )}
      />

      {selectedBoss && (
        <Box
          sx={{
            mt: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="body1" sx={{ mb: 2 }}>
            {selectedBoss.name} respawns every {selectedBoss.respawnHours} hours
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={calculateRespawnTime}
            sx={{ mt: 2 }}
          >
            Get next respawn time
          </Button>

          {respawnTime && (
            <Box
              sx={{
                mt: 6,
                p: 4,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 1,
                width: "100%",
                textAlign: "center",
                opacity: 0.9,
              }}
            >
              <Typography variant="h6" sx={{ mb: 1 }}>
                Next Respawn Time
              </Typography>
              <Typography variant="body1">
                <Box component="span" sx={{ fontWeight: "bold" }}>
                  {format(respawnTime, "PPpp")}
                </Box>
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                (in {selectedBoss.respawnHours} hours from now)
              </Typography>

              <Button
                variant="outlined"
                size="small"
                onClick={sendToDiscord}
                disabled={isLoading}
                sx={{ mt: 3 }}
              >
                {isLoading ? "Sending..." : "Send to Discord"}
              </Button>

              {webhookStatus && (
                <Typography
                  variant="caption"
                  color={
                    webhookStatus.includes("successfully")
                      ? "success.main"
                      : "error.main"
                  }
                  sx={{ display: "block", mt: 1 }}
                >
                  {webhookStatus}
                </Typography>
              )}
            </Box>
          )}
        </Box>
      )}
    </Container>
  );
}
