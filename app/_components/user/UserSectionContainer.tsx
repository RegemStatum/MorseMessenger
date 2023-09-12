import { FC, useState } from "react";
import IconWrapper from "../ui/icons/IconWrapper";
import Image from "next/image";

type Props = {
  children: React.ReactNode;
  headerText?: string;
  isClosable?: boolean;
};

const xMarkSize = 22;

const UserSectionContainer: FC<Props> = ({
  children,
  headerText,
  isClosable = true,
}) => {
  const [isOpened, setIsOpened] = useState(true);

  const closeSection = () => {
    setIsOpened(false);
  };

  if (!isOpened) return <></>;

  return (
    <div className="p-2 shadow-sm rounded-md bg-white">
      {(isClosable || headerText) && (
        <div className="pt-1 pb-2  flex items-center justify-between">
          {headerText && <h4 className="pl-1">{headerText}</h4>}
          {isClosable && (
            <div className="shrink" onClick={closeSection}>
              <IconWrapper>
                <Image
                  src="/images/icons/xMarkIcon.svg"
                  alt="close"
                  width={xMarkSize}
                  height={xMarkSize}
                />
              </IconWrapper>
            </div>
          )}
        </div>
      )}
      <div>{children}</div>
    </div>
  );
};

export default UserSectionContainer;
