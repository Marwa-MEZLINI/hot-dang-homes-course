import { getTextAlign } from "utils/fonts";
import { relativeToAbsoluteUrls } from "utils/relativeToAbsoluteUrls";

export const Paragraph = ({ textAlign = "left", content, textColor }) => {
    
    return (
        <p 
            dangerouslySetInnerHTML={{__html: relativeToAbsoluteUrls(content)}} 
            className={`font-body max-w-5xl mx-auto my-5 ${getTextAlign(textAlign)}`}
            style={{color: textColor}}
        />
    );
};