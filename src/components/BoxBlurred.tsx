function BoxBlurred({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        backdropFilter: "blur(20px)",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        border: "1px solid hsla(0,0%,100%,.28)",
        borderRadius: "8px",
      }}
    >
      {children}
    </div>
  );
}

export default BoxBlurred;
