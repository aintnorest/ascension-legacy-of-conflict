import React from "react";

const classNames = {
  container: `relative w-[0.75in] h-[0.75in] aspect-square border-2 border-[#999] rounded bg-white flex items-center justify-center text-[34px]`,
  tokenIcon: `absolute text-[10px] w-4 h-4 border border-gray-400 rounded-full flex items-center justify-center bg-white`,
  statValue: `absolute text-[16px]`,
  topLeft: `top-[2px] left-[2px]`,
  topRight: `top-[2px] right-[2px]`,
  bottomLeft: `bottom-[2px] left-[2px]`,
  bottomRight: `bottom-[2px] right-[2px]`,
  statTopRight: `top-0 right-0 top-[-3px]`,
  statBottomLeft: `left-0 bottom-[-3px]`,
};

export default function TokenSlot({
  centerContent = null,
  topLeft = null,
  topRight = null,
  bottomLeft = null,
  bottomRight = null,
  useTokenIcons = true, // When false, uses stat value styling
  topRightAsStatValue = false, // Special case for mixed mode (like strides)
  className = ``,
  ...props
}) {
  const getCornerClassName = (position) => {
    // Special handling for topRight when it should be a stat value
    if (position === `topRight` && topRightAsStatValue) {
      return `${classNames.statValue} ${classNames.statTopRight}`;
    }

    if (useTokenIcons) {
      return `${classNames.tokenIcon} ${classNames[position]}`;
    }
    // For stat values, use different positioning
    if (position === `topRight`) return `${classNames.statValue} ${classNames.statTopRight}`;
    if (position === `bottomLeft`) return `${classNames.statValue} ${classNames.statBottomLeft}`;
    return `${classNames.statValue} ${classNames[position]}`;
  };

  return (
    <div className={`${classNames.container} ${className}`} {...props}>
      {centerContent}

      {topLeft && (
        <span className={getCornerClassName(`topLeft`)}>
          {topLeft}
        </span>
      )}

      {topRight && (
        <span className={getCornerClassName(`topRight`)}>
          {topRight}
        </span>
      )}

      {bottomLeft && (
        <span className={getCornerClassName(`bottomLeft`)}>
          {bottomLeft}
        </span>
      )}

      {bottomRight && (
        <span className={getCornerClassName(`bottomRight`)}>
          {bottomRight}
        </span>
      )}
    </div>
  );
}
