import React from 'react';

export default function WithTypeColorBg(
  { children, type }: { children: React.ReactNode, type: string },
) {
  return (
    // flex used to center the type icon inside the colored div
    <div className={`
      ${type}
      h-[30px]
      m-auto
      p-1
      flex
      justify-between
      rounded-md
      text-white
      `}
    >
      {children}
    </div>
  );
}
