const { gql } = require("@apollo/client");
const { default: client } = require("client");

const handler = async (req, res) => {
    try {
        const {data} = await client.query({
            query: gql`
                query AllPropertiesQuery {
                    properties(where: {offsetPagination: {offset: 0, size: 3}}) {
                        pageInfo {
                            offsetPagination {
                              total
                            }
                        }
                        nodes {
                            databaseId
                            title
                            uri
                            featuredImage {
                                node {
                                uri
                                sourceUrl
                                }
                            }
                            propertyFeatures {
                                bathrooms
                                bedrooms
                                hasParking
                                petFriendly
                                price
                            }
                        }
                    }
                }
            `
        });
        console.log("SERVER SIDE: ", data.properties.nodes);
        return res.status(200).json({
            total: data.properties.pageInfo.offsetPagination.total,
            properties: data.properties.nodes,
        })
    } catch (e) {
        console.log("Error: ",e);
    }
};

export default handler;