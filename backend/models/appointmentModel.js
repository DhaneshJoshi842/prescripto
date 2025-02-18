import mongoose from "mongoose";

const appointmentSchema=new mongoose.Schema({
    userId:{type:string,required:true},
    docId:{type:String,required:true},
    slotDate:{type:string,required:true},
    userData:{type:Object,required:true},
    docData:{type:object,required:true},
    amount:{type:Number,required:true},
    date:{type:Number,required:true},
    cancelled:{type:bollean,default:false},
    payment:{type:Bollean,default:false},
    isCompleted:{type:Bollean,default:false}
})

const appointmentModel=mongoose.models.appointment||mongoose.model('appointment',appointmentSchema)

export default appointmentModel