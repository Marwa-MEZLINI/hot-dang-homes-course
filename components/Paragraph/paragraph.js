import { getTextAlign } from "utils/fonts";
import { relativeToAbsoluteUrls } from "utils/relativeToAbsoluteUrls";

export const Paragraph = ({ textAlign = "left", content, textColor }) => {
    
    return (
        <p 
            dangerouslySetInnerHTML={{__html: relativeToAbsoluteUrls(content)}} 
            className={`font-body max-w-5xl mx-auto ${getTextAlign(textAlign)}`}
            style={{color: textColor}}
        />
    );
};