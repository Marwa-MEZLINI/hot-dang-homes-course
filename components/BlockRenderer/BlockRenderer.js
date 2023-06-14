import { CallToActionButton } from "components/CallToActionButton";
import { Columns } from "components/Columns";
import { Cover } from "components/Cover"
import { Heading } from "components/Heading";
import { Paragraph } from "components/Paragraph";
import { theme } from "theme";

export const BlockRenderer = ({blocks}) => {
    return blocks.map((block) => {
        switch (block.name){
            case 'acf/ctabutton' : {
                console.log("CTA: ", block);
                return (
                    <CallToActionButton 
                        key={block.id}
                        buttonLabel={block.attributes.data.label}
                        destination={block.attributes.data.destination || "/"}
                        align={block.attributes.data.align}
                    />
                )
            }
            case 'core/paragraph': {
                return <Paragraph 
                    key={block.id}
                    content={block.attributes.content}
                    textAlign={block.attributes.align}
                    textColor={
                        theme[block.attributes.textColor] || 
                        block.attributes.style?.color?.text
                    }
                />
            }
            case 'core/heading': {
                return <Heading 
                    key={block.id} 
                    content={block.attributes.content} 
                    level={block.attributes.level} 
                    textAlign={block.attributes.textAlign}
                />
            }
            case 'core/cover':{
                console.log("BLOCK: ", block);
                return (
                    <Cover 
                        key={block.id} 
                        background={block.attributes.url} 
                    >
                        <BlockRenderer blocks={block.innerBlocks} />
                    </Cover>
                );
            }
            case 'core/columns': {
                return (
                    <Columns
                        key={block.id}
                        isStackedOnMobile={block.attributes.isStackedOnMobile}
                    >
                        <BlockRenderer blocks={block.innerBlocks}/>
                    </Columns>
                );
            }
            default: {
                console.log("UNKNOWN: ", block);
                return null;
            }
        }
    });
}