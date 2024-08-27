export interface submitData{
  uname:string;
  email:string;
  password:string;
}
export interface loginData{
  email:string;
  password:string;
}
export interface login{
  email:string |null;
  password:string |null;
}
export interface product{
  pname:string;
  type:string;
  color:string;
  price:string;
  description:string;
  image:string;
  id:any;
  quantity:number;
  productId:undefined|any;
}
export interface editedProduct{
  pname:string;
  type:string;
  color:string;
  price:string;
  description:string;
  image:string;
  id:any;
}
export interface cart{
  pname:string;
  type:string;
  color:string;
  price:string;
  description:string;
  image:string;
  id:any|undefined;
  quantity:number|undefined;
  userId:any;
  productId:any;
}
export interface billing{
  amount:number;
  tax:number;
  delivery:number;
  discount:number;
  total:number;
}
export interface grandtotal
{
  email:string;
  address:string;
  contact:number;
  totalprice:number;
  userId:any;
  id:number|undefined;
}
