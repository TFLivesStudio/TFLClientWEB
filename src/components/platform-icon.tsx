import Image from "next/image";
export function PlatformIcon({
  name,
}: {
  name: "Windows" | "macOS" | "Linux" | "GitHub";
}) {
  const files = {
    Windows: "microsoftwindows",
    macOS: "apple",
    Linux: "linux",
    GitHub: "github",
  };
  return (
    <Image
      className="platform-icon"
      src={`/icons/${files[name]}.svg`}
      alt=""
      width={22}
      height={22}
    />
  );
}
