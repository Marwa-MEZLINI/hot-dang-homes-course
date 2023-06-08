import { getTextAlign } from "utils/fonts";

export const Paragraph = ({ textAlign = "left", content, textColor }) => {
    
    return (
        <p 
            dangerouslySetInnerHTML={{__html: content}} 
            className={`font-body max-w-5xl mx-auto ${getTextAlign(textAlign)}`}
            style={{color: textColor}}
        />
    );
};