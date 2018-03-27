let given="Given: open login page";
let whenUser="When: enter user name [admin]";
let whenPsw="When: enter password [taylor2018]";
let then="Then: [successful!]";

class Story{
    constructor(content){
        this.content=content;
    }

    Given(context) {
        // console.log(`It's a given: ${message}`);
        this.event("given",context);
    }

    When(context){
        // console.log(`It's a when: ${message}`);
        this.event("when",context);
    }

    Then(context){
        // console.log(`It's a then: ${message}`);
        this.event("then",context);
    }

    event(event,context){
        console.log(`It's a ${event}: ${context}`);
    }

    Play(){
        for (let index = 0; index < this.content.length; index++) {
            const strContent = this.content[index];
            const key=strContent.substr(0,strContent.indexOf(":"));
            const message=strContent.substr(strContent.indexOf(":")+1);
            switch (key) {
                case "Given":
                    this.Given(message);
                    break;
                case "When":
                    this.When(message);
                    break;
                case "Then":
                    this.Then(message);
                    break;
                default:
                    this.event(key,message);
                    break;
            }
        }
    }
}

class LoginStory extends Story{
    constructor(content){
        this.content=content;
        let username,password,expected,actual;
        // let username;
        // let password;
        // let expected;
        // let actual;
    }
    when(message){
        super.when(message);
    }
}