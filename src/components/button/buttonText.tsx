import { Button } from "primereact/button";

interface buttonProps {
    color: string;
    hoverColor: string;
    text: string;
    textColor: string;
    textSize: string;
    boxshadow: string;
    setButtonStatus: () => void;
}

export default function ButtonText(props: buttonProps) {
    return (
        <Button className={`p-2 flex justify-center border-none ${props.boxshadow} ${props.color} ${props.hoverColor} focus:shadow-lg`} raised onClick={props.setButtonStatus} onTouchStart={props.setButtonStatus}>
            <p className={`${props.textSize} ${props.textColor}`}>{props.text}</p>
        </Button>
    );
}