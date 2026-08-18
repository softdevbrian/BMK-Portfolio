import { ImageResponse } from "next/og"

export const size = {
  width: 32,
  height: 32,
}
export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "8px",
          background: "linear-gradient(135deg, #2DD4BF 0%, #A78BFA 100%)",
          color: "#061215",
          fontFamily: "monospace",
          fontWeight: 900,
          fontSize: "15px",
          letterSpacing: "-0.5px",
        }}
      >
        BK
      </div>
    ),
    {
      ...size,
    }
  )
}
