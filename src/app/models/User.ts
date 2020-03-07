export class User {
  // id: number ;
  // username: string;
  email: string;
  first_name: string;
  last_name: string;
  birth_date: Date;
  city: string;
  is_tourist: boolean;
  is_guide: boolean;
  is_admin: boolean;
  sex: string;

  constructor(
    public id: number, public username: string, public avatar: string, public token: string
  ) {
}


}
