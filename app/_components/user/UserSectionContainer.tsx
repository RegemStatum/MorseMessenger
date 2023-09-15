import { FC, useState } from "react";
import IconWrapper from "../ui/icons/IconWrapper";
import Image from "next/image";

type Props = {
  children: React.ReactNode;
  headerText?: string;
  isClosable?: boolean;
  isMinimize?: boolean;
  maxHeight?: string;
};

const xMarkSize = 22;

const UserSectionContainer: FC<Props> = ({
  children,
  headerText,
  isClosable = false,
  isMinimize = false,
  maxHeight,
}) => {
  // used if able to close section
  const [isOpened, setIsOpened] = useState(true);
  // used if able to hide section
  const [isHidden, setIsHidden] = useState(false);

  const closeSection = () => {
    setIsOpened(false);
  };

  const showSection = () => {
    setIsHidden(false);
  };

  const hideSection = () => {
    setIsHidden(true);
  };

  if (!isOpened) return <></>;

  return (
    <div className="p-2 shadow-sm rounded-md bg-white">
      {(isClosable || headerText || isMinimize) && (
        <div className={`py-1 flex items-center justify-between`}>
          {headerText && <h4 className="pl-1">{headerText}</h4>}
          {isClosable && (
            <div className="flex shrink" onClick={closeSection}>
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
          {isMinimize && !isHidden && (
            <div className="flex shrink" onClick={hideSection}>
              <IconWrapper>
                <Image
                  src="/images/icons/chevronDownIcon.svg"
                  alt="close"
                  width={xMarkSize}
                  height={xMarkSize}
                />
              </IconWrapper>
            </div>
          )}
          {isMinimize && isHidden && (
            <div className="flex shrink" onClick={showSection}>
              <IconWrapper>
                <Image
                  src="/images/icons/chevronUpIcon.svg"
                  alt="close"
                  width={xMarkSize}
                  height={xMarkSize}
                />
              </IconWrapper>
            </div>
          )}
        </div>
      )}
      <div
        className={`transition-[max-height] duration-200 ${
          isHidden ? "max-h-0 overflow-hidden" : maxHeight
        }`}
      >
        <div className={`${headerText ? "pt-1" : ""}`}>{children}</div>
      </div>
    </div>
  );
};

export default UserSectionContainer;
