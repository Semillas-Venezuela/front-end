/** {
    "firstName": "Anon",
    "lastName": "User",
    "mobile": "+573018131242",
    "mail": "anon-user-019239187231@semillasvenezuela.org",
    "roles": [
      {
        "permissions": [
          "user:listMe",
          "user:readMe",
          "user:createMe",
          "user:modifyMe",
          "user:deleteMe"
        ],
        "_id": "user",
        "createdAt": "2018-10-18T17:32:55.901Z",
        "updatedAt": "2018-10-18T17:32:55.901Z",
        "__v": 0
      }
    ],
    "isAnonymous": true,
    "_id": "5bcc0b99ca15f632156ee4ce",
    "updatedAt": "2018-10-21T07:50:48.359Z",
    "createdAt": "2018-10-21T05:16:10.236Z"
  }*/
  export class Usuario{
      fisrtName:String;
      lastName:String;
      mobile:String;
      mail:String;
      roles:any;
      isAnonymous:boolean;
      __id:String;
      updatedAt:String;
      createdAt:String;
  }