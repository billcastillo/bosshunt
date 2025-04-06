// app/page.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Autocomplete,
  TextField,
  Button,
  Typography,
  Box,
  Container,
  Switch,
  FormControlLabel,
  Grid,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  IconButton,
  Divider,
} from "@mui/material";
import { format, addHours, set, parseISO } from "date-fns";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import type { BossProps, SavedBossProps } from "@/interface/boss";
import { bosses } from "@/constants/config";

export default function Home() {
  const [selectedBoss, setSelectedBoss] = useState<BossProps | null>(null);
  const [respawnTime, setRespawnTime] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [webhookStatus, setWebhookStatus] = useState<string | null>(null);
  const [useCustomTime, setUseCustomTime] = useState<boolean>(false);
  const [customHour, setCustomHour] = useState<string>("12");
  const [customMinute, setCustomMinute] = useState<string>("00");
  const [savedBosses, setSavedBosses] = useState<SavedBossProps[]>([]);

  // Load saved bosses from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("savedBosses");
    if (savedData) {
      setSavedBosses(JSON.parse(savedData));
    }
  }, []);

  const calculateRespawnTime = (): void => {
    if (!selectedBoss) return;

    let baseTime: Date;

    if (useCustomTime) {
      // Use custom death time
      const hour = parseInt(customHour, 10);
      const minute = parseInt(customMinute, 10);

      if (
        isNaN(hour) ||
        hour < 0 ||
        hour > 23 ||
        isNaN(minute) ||
        minute < 0 ||
        minute > 59
      ) {
        alert("Please enter valid hour (0-23) and minute (0-59) values");
        return;
      }

      // Set current date with custom hour and minute
      baseTime = set(new Date(), {
        hours: hour,
        minutes: minute,
        seconds: 0,
        milliseconds: 0,
      });
    } else {
      // Use current time
      baseTime = new Date();
    }

    const nextRespawn = addHours(baseTime, selectedBoss.respawnHours);

    setRespawnTime(nextRespawn);
    setWebhookStatus(null);
  };

  const sendToDiscord = async (): Promise<void> => {
    if (!selectedBoss || !respawnTime) return;

    setIsLoading(true);
    try {
      await sendBossToDiscord(selectedBoss, respawnTime, useCustomTime);

      // Save to localStorage after successful Discord send
      saveBossToLocalStorage(selectedBoss, respawnTime);

      setWebhookStatus("Sent to Discord successfully!");
    } catch (error) {
      setWebhookStatus("Failed to send to Discord. Try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const sendBossToDiscord = async (
    boss: BossProps,
    time: Date,
    customTimeUsed: boolean
  ): Promise<void> => {
    const response = await fetch("/api/discord-webhook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bossName: boss.name,
        respawnTime: time.toISOString(),
        respawnHours: boss.respawnHours,
        customTimeUsed: customTimeUsed,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to send to Discord");
    }
  };

  const saveBossToLocalStorage = (boss: BossProps, time: Date): void => {
    const savedBoss: SavedBossProps = {
      id: boss.id,
      name: boss.name,
      respawnHours: boss.respawnHours,
      respawnTime: time.toISOString(),
    };

    // Check if this boss already exists in the list
    const updatedBosses = [...savedBosses];
    const existingIndex = updatedBosses.findIndex((b) => b.id === boss.id);

    if (existingIndex >= 0) {
      // Replace existing boss
      updatedBosses[existingIndex] = savedBoss;
    } else {
      // Add new boss
      updatedBosses.push(savedBoss);
    }

    // Save to state and localStorage
    setSavedBosses(updatedBosses);
    localStorage.setItem("savedBosses", JSON.stringify(updatedBosses));
  };

  const deleteSavedBoss = (bossId: number): void => {
    const updatedBosses = savedBosses.filter((boss) => boss.id !== bossId);
    setSavedBosses(updatedBosses);
    localStorage.setItem("savedBosses", JSON.stringify(updatedBosses));
  };

  const resendBossToDiscord = async (boss: SavedBossProps): Promise<void> => {
    setIsLoading(true);
    try {
      const respawnDate = parseISO(boss.respawnTime);
      await sendBossToDiscord(
        { id: boss.id, name: boss.name, respawnHours: boss.respawnHours },
        respawnDate,
        false
      );
      alert(`Resent ${boss.name} to Discord successfully!`);
    } catch (error) {
      alert(`Failed to resend ${boss.name} to Discord.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const hour = parseInt(value, 10);

    if (value === "" || (hour >= 0 && hour <= 23)) {
      setCustomHour(value);
    }
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const minute = parseInt(value, 10);

    if (value === "" || (minute >= 0 && minute <= 59)) {
      setCustomMinute(value);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6, pb: 8 }}>
      <Typography
        variant="h3"
        component="h1"
        sx={{ textAlign: "center", fontWeight: "bold", mb: 6 }}
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
            mt: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="body1" sx={{ mb: 2 }}>
            {selectedBoss.name} respawns every {selectedBoss.respawnHours} hours
          </Typography>

          <FormControlLabel
            control={
              <Switch
                checked={useCustomTime}
                onChange={(e) => setUseCustomTime(e.target.checked)}
                color="primary"
              />
            }
            label="Set custom death time"
            sx={{ mb: 2 }}
          />

          {useCustomTime && (
            <Grid container spacing={2} sx={{ mb: 2, width: "100%" }}>
              <Grid size={6}>
                <TextField
                  label="Hour (0-23)"
                  variant="outlined"
                  value={customHour}
                  onChange={handleHourChange}
                  type="number"
                  slotProps={{
                    htmlInput: {
                      min: 0,
                      max: 23,
                    },
                  }}
                  fullWidth
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  label="Minute (0-59)"
                  variant="outlined"
                  value={customMinute}
                  onChange={handleMinuteChange}
                  type="number"
                  slotProps={{
                    htmlInput: {
                      min: 0,
                      max: 59,
                    },
                  }}
                  fullWidth
                />
              </Grid>
            </Grid>
          )}

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
                mt: 5,
                p: 3,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 1,
                // bgcolor: "primary.light",
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
                (in {selectedBoss.respawnHours} hours from{" "}
                {useCustomTime ? "custom time" : "now"})
              </Typography>

              <Button
                variant="outlined"
                startIcon={<SendIcon />}
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

      {/* Saved Bosses List */}
      {savedBosses.length > 0 && (
        <Box sx={{ mt: 6 }}>
          <Divider sx={{ mb: 4 }} />
          <Typography variant="h5" sx={{ mb: 3 }}>
            Tracked Bosses
          </Typography>

          {savedBosses.map((boss) => {
            const respawnDate = parseISO(boss.respawnTime);
            return (
              <Card
                key={boss.id}
                sx={{ mb: 3, border: "1px solid", borderColor: "divider" }}
              >
                <CardHeader
                  title={boss.name}
                  subheader={`Respawns every ${boss.respawnHours} hours`}
                  sx={{ pb: 1 }}
                />
                <CardContent sx={{ py: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                    Next Respawn: {format(respawnDate, "PPpp")}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "flex-end" }}>
                  <Button
                    size="small"
                    startIcon={<SendIcon />}
                    onClick={() => resendBossToDiscord(boss)}
                    disabled={isLoading}
                  >
                    Resend
                  </Button>
                  <IconButton
                    aria-label="delete"
                    onClick={() => deleteSavedBoss(boss.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            );
          })}
        </Box>
      )}
    </Container>
  );
}
