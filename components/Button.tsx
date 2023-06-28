import Image from "next/image";
import { MouseEventHandler } from "react";

type Props = {
    title: string;
    leftIcon?: string | null;
    rightIcon?: string | null;
    handleClick?: MouseEventHandler;
    isSubmiting?: boolean;
    type?: 'button' | 'submit';
    bgColor?: string;
    textColor?: string;
}

function Button({ title, leftIcon, rightIcon, handleClick, isSubmiting, type, bgColor, textColor }:Props) {
  return (
    <button
      type={type || 'button'}
      disabled={isSubmiting}
      //bgColor and textcol 
      className={`flexCenter gap-3 px-4 py-3 
      ${textColor ?textColor:'text-white'}
      ${isSubmiting ? 'bg-black/50' : bgColor ? bgColor : 'bg-primary-purple'} rounded-xl text-sm font-medium max-md:w-full`}
      onClick={handleClick}
    >
      {leftIcon && <Image src={leftIcon} width={14} height={14} alt="left" />}
      {title}
      {rightIcon && <Image src={rightIcon} width={14} height={14} alt="left" />}
    </button>
  )
}

export default Button