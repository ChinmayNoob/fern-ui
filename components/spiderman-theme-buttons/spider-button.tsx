'use client'
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import style from "./spider-button.module.css";
import { buttonAnim, clickAnim } from "./spiderbtn-animation";

export type SpidermanButtonProps = {
    buttonName: string;
    hoverBtnName: string;
    btnClassName?: string;
    variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'default';
    handleButtonClick: (e: any) => void;
}


export const RANDOM_INT = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1) + min);

export default function SpiderButton({ buttonName, hoverBtnName, btnClassName, variant = 'default', handleButtonClick }: SpidermanButtonProps) {
    const [btnName, setBtnName] = useState(buttonName);
    const [shakeAmount, setShakeAmount] = useState(8);
    const [clickOffset, setClickOffset] = useState(0);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setShakeAmount(RANDOM_INT(6, 12));
        setClickOffset(RANDOM_INT(-50, 50));
        setIsMounted(true);
    }, []);

    const getButtonClassName = () => {
        let className = style.btn;
        if (variant !== 'default') {
            className += ` ${style[variant]}`;
        }
        if (btnClassName) {
            className += ` ${btnClassName}`;
        }
        return className;
    };

    if (!isMounted) {
        return (
            <button
                type="button"
                className={getButtonClassName()}
                onClick={handleButtonClick}
            >
                {buttonName}
            </button>
        );
    }

    return (
        <motion.button
            type="button"
            className={getButtonClassName()}
            initial="init"
            animate="init"
            whileHover="hover"
            whileTap="tap"
            whileFocus="focus"
            variants={buttonAnim}
            custom={shakeAmount}
            onMouseEnter={() => setBtnName(hoverBtnName)}
            onMouseLeave={() => setBtnName(buttonName)}
            onClick={handleButtonClick}
        >
            {btnName}
            <motion.div className={style.click} variants={clickAnim} custom={clickOffset}></motion.div>
        </motion.button>
    );
} 