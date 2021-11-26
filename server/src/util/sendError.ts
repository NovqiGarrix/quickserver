import { Response } from "express";

const sendHTTPError = (res: Response, message: string | Object, code: number = 500): Response => {

    const response = {
        data: null,
        error: message
    }

    return res.send(response);

}

export default sendHTTPError