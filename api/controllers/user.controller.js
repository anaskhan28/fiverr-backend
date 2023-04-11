import User from '../models/user.model.js';
import createError from '../utils/createError.js';


export const deleteUser = async(req, res , next) =>{

    const user = await User.findById(req.params.id);

    if(!user){
        return next(createError(400, "User doesn't exist"))
    }

        if(req.userId!== user._id.toString()){
            return next(createError(403, "You can only deleted your account"))
        }

        await User.findByIdAndDelete(req.params.id);
        next(createError(500, "Account deleted!"))
    

}

export const getUser = async(req, res , next) =>{

    const user = await User.findById(req.params.id);

    if(!user){
        return next(createError(400, "User doesn't exist"))
    }
    res.status(200).send(user)
    

}