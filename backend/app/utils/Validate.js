

const IsContainHtml = (str) => {
    const htmlPattern = /<[\s\S]*>/;
    return htmlPattern.test(str);
}

const IsValidLogin = (login) => {
    return login.length >= 3 && !IsContainHtml(login)
}
const IsValidPassword = (password) => {
    return password.length >= 3 && !IsContainHtml(password)
}

const IsRealData = (height, age ,weight, wantWeight, wantView, stat) => {
    if(stat == "Men") {
        if(age >= 5 && age <= 15 && weight > 80) {
            return "З таким віком, як у Вас, можлива максимальна вага 80!"
        } 
        if(age > 15 && age <= 200 && weight < 40) {
            return "З таким віком, як у Вас, можлива мінімальна вага 40!"
        }
        const index = (height - 100)*1.15;
        if(index -30 >= weight || index + 10 <= weight)
            return "Така вага за такого росту не можлива!"
        else
        {
            if(index -30 >= wantWeight || index + 10 <= wantWeight)
                return "Така бажана вага за такого росту не можлива!"
            else
            {
                //if(weight >= wantWeight && wantView == "gainweight")
                //    return "Ви не можете набирати масу та одночасно худнути"
                //if(weight <= wantWeight && wantView == "loseweight")
                //    return "Ви не можете одночасно худнути та набирати вагу"
                return "";
            }
        }
    }
    else {
        if(age >= 5 && age <= 15 && weight > 80) {
            return "З таким віком, як у Вас, можлива максимальна вага 80!"
        } 
        if(age > 15 && age <= 200 && weight < 40) {
            return "З таким віком, як у Вас, можлива мінімальна вага 40!"
        }
        const index = (height - 110)*1.15;
        if(index -30 >= weight || index + 30 <= weight)
            return "Така вага за такого росту не можлива!"
        else
        {
            if(index -30 >= wantWeight || index + 30 <= wantWeight)
                return "Така бажана вага за такого росту не можлива!"
            else
            {
                //if(weight >= wantWeight && wantView == "gainweight")
                //    return "Ви не можете набирати масу та одночасно худнути"
                //if(weight <= wantWeight && wantView == "loseweight")
                //    return "Ви не можете одночасно худнути та набирати вагу"
                return "";
            }
        }
    }

}

module.exports = {
    IsContainHtml,
    IsValidLogin,
    IsValidPassword,
    IsRealData
}