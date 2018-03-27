const webdriver = require("selenium-webdriver");
let given="Given: open login page";
let whenUser="When: enter user name [admin]";
let whenPsw="When: enter password [taylor2018]";
let then="Then: [successful!]";

let loginStory=[given,whenUser,whenPsw,then];

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
    constructor(loginStory){
        super(loginStory);
        let username,password,expected,actual;
        // let username;
        // let password;
        // let expected;
        // let actual;
    }
    When(message){
        super.When(message);
        const str=message.match(/\[(.+?)\]/g);
        if(/enter user name/i.test(message)){
            const name=str.substr(1,message.length-2);

            this.username=name;
        }
        if(/enter password/i.test(message)){
            const psw=str.substr(1,message.length-2);

            this.username=psw;
        }
    }
    Then(message){
        super.Then(message); 
              
        this.expect=(message.match(/\[(.+?)\]/g)).substr(1,message.length-2);
        let driver= new webdriver.Builder().forBrowser("chrome").build();
        //const login_url='https://everdoc.github.io/hellojs/login.html';
        const login_url='https://everdoc.github.io/hellojs/quize/login.html';
        driver.get(login_url);
        driver.wait(webdriver.until.titleIs("Login Quize"), 1000*30)
        .then((success)=>{
            console.log("Enter:",this.username);
            console.log("Enter:",this.password);
            driver.findElement(webdriver.By.id('name')).sendKeys(this.username);
            driver.findElement(webdriver.By.id('password')).sendKeys(this.password);
            
            driver.wait(driver,1000*20);
            
            driver.findElement(webdriver.By.tagName('button')).click();
            //driver.wait(1000*20);
            driver.findElement(webdriver.By.id('result')).getText().then((message)=>{
                this.actual=message;
                console.log("Expected:",this.expected);
                console.log("Actual:", this.actual);
                let isPass=new RegExp(this.expected,'i').test(this.actual);
                console.log("The case is", isPass?"PASS":"FAIL");
                driver.quit();
            });
            },(reason)=>{
                // do nothing
                console.log(reason);
                driver.quit();
        });

    } 

}

let objStory=new LoginStory(loginStory);
objStory.Play();