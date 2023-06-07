import {v4 as uuid} from 'uuid'

export const cleanAndTransformBlocks = (blocksJSON) => {
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

    const removeUnusedDataAndAssignId = (b) => {
        b.forEach(block => {
            block.id = uuid();
            deleteKeys.forEach(deleteKey => {
                delete block[deleteKey];
            });
            if (block.innerBlocks?.length){
                removeUnusedDataAndAssignId(block.innerBlocks);
            } else {
                delete block.innerBlocks;
            }
        });
    };

    removeUnusedDataAndAssignId(blocks);

    return blocks;
};