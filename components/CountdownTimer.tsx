import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { differenceInSeconds, format } from "date-fns";

interface CountdownTimerProps {
  targetDate: Date;
  showFullDate?: boolean;
  onComplete?: () => void;
}

export default function CountdownTimer({
  targetDate,
  showFullDate = true,
  onComplete,
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [isComplete, setIsComplete] = useState<boolean>(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const diffInSeconds = differenceInSeconds(targetDate, now);

      if (diffInSeconds <= 0) {
        setTimeLeft("Respawn time reached!");
        setIsComplete(true);
        if (onComplete) onComplete();
        return;
      }

      const days = Math.floor(diffInSeconds / (60 * 60 * 24));
      const hours = Math.floor((diffInSeconds % (60 * 60 * 24)) / (60 * 60));
      const minutes = Math.floor((diffInSeconds % (60 * 60)) / 60);
      const seconds = Math.floor(diffInSeconds % 60);

      let timeString = "";
      if (days > 0) timeString += `${days}d `;
      timeString += `${hours}h ${minutes}m ${seconds}s`;

      setTimeLeft(timeString);
    };

    calculateTimeLeft();
    const timerId = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timerId);
  }, [targetDate, onComplete]);

  return (
    <>
      <Typography variant="body1" sx={{ fontWeight: "medium" }}>
        {isComplete ? "Respawn time reached!" : <>Respawns in: {timeLeft}</>}
      </Typography>

      {showFullDate && (
        <Typography variant="caption" color="text.secondary" display="block">
          (Full date: {format(targetDate, "PPpp")})
        </Typography>
      )}
    </>
  );
}
