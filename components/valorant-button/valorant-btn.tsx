
import { ValorantButtonProps } from "./valorant-playground";
import S from "./valorant.module.css";

export default function ValorantButton({
    text = "JOIN NOW",
    buttonColor = 0,
    textColor = "#000",
    variant = "default",
    ...props
}: ValorantButtonProps) {
    const getVariantClass = () => {
        switch (variant) {
            case 'liquid':
                return S.buttonLiquid;
            case 'neon':
                return S.buttonNeon;
            case 'warp':
                return S.buttonWarp;
            default:
                return S.button;
        }
    };

    return (
        <button
            className={getVariantClass()}
            data-text={text}
            style={{
                '--hue': `${buttonColor}deg`,
                '--text-color': textColor,
                color: textColor,
            } as React.CSSProperties}
            {...props}
        >
            <div />
            <span>{text}</span>
            {variant === 'warp' && (
                <div className={S.warpStreaks}>
                    <i />
                    <i />
                    <i />
                    <i />
                </div>
            )}
        </button>
    );
}
