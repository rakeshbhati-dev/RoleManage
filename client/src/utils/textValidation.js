export function textValidation(value,field,pattern='',length=3){
    let errorMsg=''
    if(!value){
        return errorMsg=`Please Enter ${field}`
    }
    else if(value.length<length){
        return errorMsg=`Minimum ${length} character required`
    }
    else if(pattern!='' && !pattern.test(value)){
        return errorMsg=`Invalid ${field}`
    }
    else {
        return errorMsg=null
    }
}

