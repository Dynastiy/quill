export class UserData {

    public currentUserName: string;
    public currentUserToken: string;


    constructor(userName: string, userToken: string) {
        this.currentUserName = userName;
        this.currentUserToken = userToken;
    }

}