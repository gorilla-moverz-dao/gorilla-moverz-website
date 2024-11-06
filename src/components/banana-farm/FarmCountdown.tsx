import { Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";

export default function FarmCountdown({ seconds, onActivate }: { seconds: number; onActivate: () => void }) {
  const [timeLeft, setTimeLeft] = useState({
    mins: Math.floor(seconds / 60),
    secs: seconds % 60,
  });

  useEffect(() => {
    // Calculate the target end time
    const endTime = new Date().getTime() + seconds * 1000;

    const interval = setInterval(() => {
      const now = new Date().getTime() - 1000;
      const difference = endTime - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ mins: 0, secs: 0 });
      } else {
        // Convert difference to minutes and seconds
        const mins = Math.floor((difference / (1000 * 60)) % 60);
        const secs = Math.floor((difference / 1000) % 60);
        setTimeLeft({ mins, secs });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  const enabled = timeLeft.mins <= 0 && timeLeft.secs <= 0;
  const buttonText = enabled
    ? "Farm Bananas"
    : `Farm Bananas in ${timeLeft.mins}:${timeLeft.secs < 10 ? `0${timeLeft.secs}` : timeLeft.secs}`;

  return (
    <Button onClick={onActivate} colorScheme={enabled ? "green" : "gray"} disabled={!enabled}>
      {buttonText}
    </Button>
  );
}
