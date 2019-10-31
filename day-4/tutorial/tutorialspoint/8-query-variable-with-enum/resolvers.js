const Query = {
  setFavouriteColor:(root,args) => {
    return  "Your Fav Color is :"+args.color;
 }
}
module.exports = {Query}