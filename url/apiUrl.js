let type = 'dev';
const url = type=='dev'?`http://localhost:5000/api/`:`http://3.18.230.45:5000/api/`

export const API_URL = {
    BucketURl:`https://agentgateway.s3.us-east-2.amazonaws.com/`,
    loginUser: `${url}user/loginUser`,
    getAgentDevelopment: `${url}agent/getAgentDevelopment`,
    getAssignedDevelopment: `${url}agent/getAssignedDevelopment`,
    getSearchResult: `${url}agent/getSearchResult`,
    checkToken: `${url}user/checkIfTokenHasExpired?token`,
    getOneUser: `${url}user/getOneUser`,
    getDevelopmentDetails: `${url}agent/getDevelopmentDetails`,
    checkToken: `${url}user/checkIfTokenHasExpired?token`,
    getDevelopmentUnitDetails: `${url}agent/getDevelopmentUnitDetails`,
    updateOneUnitStatusDevelopment: `${url}development/updateOneUnitStatusDevelopment`
}