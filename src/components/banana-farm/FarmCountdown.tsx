import { useState, useEffect } from "react";

export default function FarmCountdown({ seconds }: { seconds: number }) {
  const [timeLeft, setTimeLeft] = useState({
    mins: Math.floor(seconds / 60),
    secs: seconds % 60,
  });

  useEffect(() => {
    // Calculate the target end time
    const endTime = new Date().getTime() + seconds * 1000;

    const interval = setInterval(() => {
      const now = new Date().getTime();
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

  if (timeLeft.mins <= 0 && timeLeft.secs <= 0) return "Farm Bananas";

  return (
    <>
      Farm Bananas in {timeLeft.mins}:{timeLeft.secs < 10 ? `0${timeLeft.secs}` : timeLeft.secs}
    </>
  );
}
