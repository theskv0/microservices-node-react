import { sign, verify } from "jsonwebtoken";

interface UserPaylod {
  user_id: string;
}

export const JwtUtil = {
  signToken: (payload: UserPaylod) => {
    return sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });
  },
  validateToken: (token: string) => {
    try {
      return verify(token, process.env.JWT_SECRET!);
    } catch (err) {
      return null;
    }
  },
};
