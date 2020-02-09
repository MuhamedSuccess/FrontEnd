export class User {
  id: any ;
  username: any;
  email: any;
  first_name: any;
  last_name: any;
  birthDate: any;
  city: any;
  is_tourist: any;
  is_guide: any;
  is_admin: any;
  sex: any;
  token: any;

  constructor() {
    this.id = 0;
    this.first_name = '';
    this.username = '';
    this.email = '';
    this.last_name = '';
    this.is_tourist = false;
    this.is_guide = false;
    this.sex = '';
    this.city = '';
    this.token = '';


}

 // fillUser(id, fname, lname, t, g, s) {
 //  this.id = id;
 //  this.first_name = fname;
 //  this.last_name = lname;
 //  this.is_tourist = t;
 //  this.is_guide = g;
 //  this.sex = s;
 // }
}
