import createError from "../utils/createError.js"
import Review from '../models/review.model.js'
import Order from "../models/order.model.js";
import Gig from '../models/gig.model.js'
export const createReview = async (req, res, next) =>{
    if(req.isSeller)
        return next(createError(403, "Sellers can't create a review!"));

        const newReview = new Review({
            userId: req.userId,
            gigId: req.body.gigId,
            desc: req.body.desc,
            star: req.body.star,
        
        })


    try{
        // const isBought = await Order.findOne({gigId: req.body.gigId})

        // if(!isBought)
        // return next(createError(403, "You have not purchased this git yet!"))

        const review = await Review.findOne({
            gigId: req.body.gigId,
            userId: req.body.userId,
        });

        if(review)return next(createError(403, "You have already created a review for this gig!"))
        
        const savedReview = await newReview.save();

        await Gig.findByIdAndUpdate(req.body.gigId, {$inc:{totalStars: req.body.star, starNumber:1}})
        res.status(201).send(savedReview)

 
    }catch(error){
        next(error)
    }
}

export const getReviews = async (req, res, next) =>{
    try{
        const reviews = await Review.find({gigId: req.params.gigId});
        res.status(200).send(reviews)

    }catch(error){
        next(error)
    }
}

export const deleteReview = async (req, res, next) =>{
    try{

    }catch(error){
        next(error)
    }
}