import httpConstants from "../constant/httpConstants";

export interface ResponseInterface {
    isValid: Boolean;
    status: number;
    data: object;
}

export class GeneralValidator {
    /**
     * general function to return api error response
     * @return {ResponseInterface}
     */
    public error(
        message: Array<object>,
        errorCode = httpConstants.HTTP_UNPROCESSABLE_ENTITY
    ): ResponseInterface {
        let formattedMessage = [];
        for (const error in message) {
            formattedMessage.push(message[error]['message'])
        };
        const resp: ResponseInterface = {
            isValid: false,
            status: errorCode,
            data: { error: formattedMessage },
        };
        return resp;
    }

    /**
     * general function to return api success response
     * @return {ResponseInterface}
     */
    public success(): ResponseInterface {
        const resp: ResponseInterface = {
            isValid: true,
            status: httpConstants.HTTP_SUCCESS_OK,
            data: {},
        };
        return resp;
    }
}

const generalValidator: GeneralValidator = new GeneralValidator();
export default generalValidator;
