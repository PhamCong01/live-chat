import { Request, Response } from "express";
import { returnServerError } from "../app/constants";
import UserModel from "../models/Users.models";
import {
    getContacts,
    getUserData,
    createUser,
} from "../services/auth.services";

class AuthController {
    // [POST] /auth/login
    // @desc Login user
    public async login(req: Request, res: Response) {
        try {
            if (!req.headers.authorization) {
                return res.status(403).json({
                    success: false,
                    message: "User is not logged in",
                });
            }
            const userData = await getUserData(
                req.headers.authorization.split(" ")[1]
            );
            if (!userData.success) {
                return res.status(500).json({
                    success: false,
                    message: userData.message,
                });
            }

            // add to mongodb
            const user = await UserModel.findOne({
                nickname: userData.userData.nickname,
            });
            const contacts = await getContacts(
                userData.userData.identities[0].access_token
            );
            if (!user) {
                const userInfo = await createUser(
                    userData.userData.nickname,
                    userData.userData.picture,
                    userData.userData.name
                );
                if (!userInfo.success) {
                    return returnServerError(res, userInfo.message);
                }
                return res.json({
                    success: true,
                    userData,
                });
            }

            return res.json({ success: true, userData: user });
        } catch (err) {
            return returnServerError(res, err.message);
        }
    }
}

export default new AuthController();
