import { gql } from '@apollo/client';
import client from 'client';
import {v4 as uuid} from 'uuid'

export const cleanAndTransformBlocks = async (blocksJSON) => {
    const {data} = await client.query({
        query: gql`
            query AllPages {
                pages {
                    nodes {
                        uri
                        databaseId
                    }
                }
            }
        `
    });
    console.log("all pages: ", data);
    const blocks = JSON.parse(blocksJSON)

    const deleteKeys = [
        "attributesType",
        "blockType",
        "dynamicContent",
        "get_parent",
        "order",
        "originalContent",
        "postId",
        "saveContent"
    ];

    const cleanBlocks = (b) => {
        b.forEach(block => {
            block.id = uuid();
            deleteKeys.forEach(deleteKey => {
                delete block[deleteKey];
            });
            if (block.name === "acf/ctabutton"){
                const associatedPage = data.pages.nodes.find(page => page.databaseId === block.attributes.data.destination)
                if (associatedPage) {
                    block.attributes.data.destination = associatedPage.uri;
                }
            }   
            if (block.innerBlocks?.length){
                cleanBlocks(block.innerBlocks);
            } else {
                delete block.innerBlocks;
            }
        });
    };

    cleanBlocks(blocks);

    return blocks;
};