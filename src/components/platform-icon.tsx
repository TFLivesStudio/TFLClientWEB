import Image from "next/image";
import windows from "../../public/icons/microsoftwindows.svg";
import apple from "../../public/icons/apple.svg";
import linux from "../../public/icons/linux.svg";
import github from "../../public/icons/github.svg";
export function PlatformIcon({
  name,
}: {
  name: "Windows" | "macOS" | "Linux" | "GitHub";
}) {
  const files = {
    Windows: windows,
    macOS: apple,
    Linux: linux,
    GitHub: github,
  };
  return (
    <Image
      className="platform-icon"
      src={files[name]}
      alt=""
      width={22}
      height={22}
    />
  );
}
